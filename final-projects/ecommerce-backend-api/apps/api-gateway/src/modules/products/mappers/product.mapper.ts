import { ProductDomain } from '../domain/product.domain';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../infrastructure/entities/product.entity';

export class ProductMapper {
  static fromDto(dto: CreateProductDto): ProductDomain {
    return new ProductDomain({
      name: dto.name,
      slug: '',
      description: dto.description,
      price: dto.price,
      images: dto.images,
      stock: dto.stock,
      category: dto.category,
      specifications: dto.specifications ?? {},
      isActive: dto.isActive ?? true,
    });
  }

  static toDomain(entity: ProductEntity): ProductDomain {
    return new ProductDomain({
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      price: Number(entity.price),
      images: entity.images,
      stock: entity.stock,
      category: entity.category,
      specifications: entity.specifications,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: ProductDomain): ProductEntity {
    const entity = new ProductEntity();

    entity.id = domain.id ?? entity.id;
    entity.name = domain.name;
    entity.slug = domain.slug;
    entity.description = domain.description;
    entity.price = domain.price;
    entity.images = domain.images;
    entity.stock = domain.stock;
    entity.category = domain.category;
    entity.specifications = domain.specifications;
    entity.isActive = domain.isActive;

    return entity;
  }

  static toUpdateEntity(dto: UpdateProductDto): Partial<ProductEntity> {
    return {
      ...(dto.name !== undefined && {
        name: dto.name,
      }),

      ...(dto.description !== undefined && {
        description: dto.description,
      }),

      ...(dto.price !== undefined && {
        price: dto.price,
      }),

      ...(dto.images !== undefined && {
        images: dto.images,
      }),

      ...(dto.stock !== undefined && {
        stock: dto.stock,
      }),

      ...(dto.category !== undefined && {
        category: dto.category,
      }),

      ...(dto.specifications !== undefined && {
        specifications: dto.specifications,
      }),

      ...(dto.isActive !== undefined && {
        isActive: dto.isActive,
      }),
    };
  }

  static toResponse(domain: ProductDomain): ProductResponseDto {
    return {
      id: domain.id ?? '',
      name: domain.name,
      slug: domain.slug,
      description: domain.description,
      price: domain.price,
      images: domain.images,
      stock: domain.stock,
      category: domain.category,
      specifications: domain.specifications,
      isActive: domain.isActive,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
