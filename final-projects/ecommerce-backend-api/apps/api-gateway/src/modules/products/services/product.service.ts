import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/repositories/product.repository';
import { ProductMapper } from '../mappers/product.mapper';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { GetProductsQueryDto } from '../dto/get-products-query.dto';
import { PaginatedProductsResponseDto } from '../dto/paginated-products-response.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  //Slug helper
  private createSlug(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private async generateUniqueSlug(
    name: string,
    excludeId?: string,
  ): Promise<string> {
    const baseSlug = this.createSlug(name);

    let slug = baseSlug;
    let counter = 2;

    while (await this.productRepository.existsBySlug(slug, excludeId)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  //GET ALL PRODUCTS
  async getProducts(
    query: GetProductsQueryDto,
  ): Promise<PaginatedProductsResponseDto> {
    const result = await this.productRepository.findProducts(query);

    return {
      items: result.items.map((product) => ProductMapper.toResponse(product)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  //GET PRODUCT BY ID
  async getProduct(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductMapper.toResponse(product);
  }

  //CREATE PRODUCT
  async createProduct(dto: CreateProductDto) {
    const domain = ProductMapper.fromDto(dto);

    domain.slug = await this.generateUniqueSlug(domain.name);

    const product = await this.productRepository.create(domain);

    return ProductMapper.toResponse(product);
  }

  //UPDATE PRODUCT
  async updateProduct(id: string, dto: UpdateProductDto) {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const entity = ProductMapper.toUpdateEntity(dto);

    if (dto.name && dto.name !== existingProduct.name) {
      entity.slug = await this.generateUniqueSlug(dto.name, id);
    }

    const updated = await this.productRepository.update(id, entity);

    return ProductMapper.toResponse(updated);
  }

  //DELETE PRODUCT
  async deleteProduct(id: string) {
    await this.productRepository.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }

  //GET PRODUCT BY SLUG
  async getProductBySlug(slug: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findBySlug(slug);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductMapper.toResponse(product);
  }
}
