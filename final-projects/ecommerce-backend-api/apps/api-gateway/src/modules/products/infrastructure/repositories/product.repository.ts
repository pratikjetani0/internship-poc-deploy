import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDomain } from '../../domain/product.domain';
import { ProductMapper } from '../../mappers/product.mapper';
import { GetProductsQueryDto } from '../../dto/get-products-query.dto';
import { PaginatedResponse } from '@app/common/types/paginated-response.type';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async findProducts(
    query: GetProductsQueryDto,
  ): Promise<PaginatedResponse<ProductDomain>> {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 12);

    const queryBuilder = this.repository.createQueryBuilder('product');

    if (query.status === 'active') {
      queryBuilder.where('product.isActive = :isActive', {
        isActive: true,
      });
    } else if (query.status === 'inactive') {
      queryBuilder.where('product.isActive = :isActive', {
        isActive: false,
      });
    } else if (query.status === 'all') {
      // Show both active and inactive
    } else {
      queryBuilder.where('product.isActive = :isActive', {
        isActive: true,
      });
    }

    if (query.search) {
      queryBuilder.andWhere(
        `
        (
          LOWER(product.name) LIKE LOWER(:search)
          OR LOWER(product.description) LIKE LOWER(:search)
          OR LOWER(product.category) LIKE LOWER(:search)
        )
      `,
        {
          search: `%${query.search}%`,
        },
      );
    }

    if (query.category && query.category !== 'all') {
      queryBuilder.andWhere('LOWER(product.category) = LOWER(:category)', {
        category: query.category,
      });
    }

    if (query.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }

    if (query.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    if (query.inStock !== undefined) {
      if (String(query.inStock) === 'true') {
        queryBuilder.andWhere('product.stock > 0');
      } else if (String(query.inStock) === 'false') {
        queryBuilder.andWhere('product.stock = 0');
      }
    }

    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'DESC';

    queryBuilder.orderBy(`product.${sortBy}`, sortOrder);

    queryBuilder.skip((page - 1) * limit);

    queryBuilder.take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      items: products.map((product) => ProductMapper.toDomain(product)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<ProductDomain | null> {
    const product = await this.repository.findOne({
      where: { id },
    });

    return product ? ProductMapper.toDomain(product) : null;
  }

  async create(product: ProductDomain): Promise<ProductDomain> {
    const entity = ProductMapper.toEntity(product);

    const saved = await this.repository.save(entity);

    return ProductMapper.toDomain(saved);
  }

  async update(
    id: string,
    entity: Partial<ProductEntity>,
  ): Promise<ProductDomain> {
    const product = await this.repository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, entity);

    const saved = await this.repository.save(product);

    return ProductMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async findBySlug(slug: string): Promise<ProductDomain | null> {
    const product = await this.repository.findOne({
      where: {
        slug,
        isActive: true,
      },
    });

    return product ? ProductMapper.toDomain(product) : null;
  }

  async existsBySlug(slug: string, excludeId?: string): Promise<boolean> {
    const query = this.repository
      .createQueryBuilder('product')
      .where('product.slug = :slug', { slug });

    if (excludeId) {
      query.andWhere('product.id != :excludeId', { excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }

  async hasStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.repository.findOne({
      where: { id: productId },
      select: { stock: true },
    });

    return !!product && product.stock >= quantity;
  }

  async decrementStock(productId: string, quantity: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(ProductEntity)
      .set({ stock: () => 'stock - :quantity' })
      .where('id = :id', { id: productId })
      .andWhere('stock >= :quantity', { quantity })
      .execute();
  }
}
