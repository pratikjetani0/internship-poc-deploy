export type ProductDomainProps = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  specifications: Record<string, unknown>;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class ProductDomain {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: string;
  specifications: Record<string, unknown>;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: ProductDomainProps) {
    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.description = props.description;
    this.price = props.price;
    this.images = props.images;
    this.stock = props.stock;
    this.category = props.category;
    this.specifications = props.specifications;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
