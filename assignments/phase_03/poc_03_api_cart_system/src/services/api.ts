import type { Product } from "../types/index.js";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
  },
  {
    id: 3,
    title: "Powder Canister",
    price: 14.99,
    description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    category: "beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
  },
  {
    id: 4,
    title: "Red Lipstick",
    price: 12.99,
    description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    category: "beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
  },
  {
    id: 5,
    title: "Red Nail Polish",
    price: 8.99,
    description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    category: "beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    price: 49.99,
    description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    category: "fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    price: 129.99,
    description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    category: "fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
  },
  {
    id: 8,
    title: "Dior J'adore",
    price: 89.99,
    description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: "fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
  },
  {
    id: 9,
    title: "Dolce Shine Eau de",
    price: 69.99,
    description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    category: "fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp"
  },
  {
    id: 10,
    title: "Gucci Bloom Eau de",
    price: 79.99,
    description: "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    category: "fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"
  },
  {
    id: 11,
    title: "Annibale Colombo Bed",
    price: 1899.99,
    description: "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    category: "furniture",
    image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
  },
  {
    id: 12,
    title: "Annibale Colombo Sofa",
    price: 2499.99,
    description: "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    category: "furniture",
    image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
  }
];

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=24");
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        return data.products.map(
          (item: {
            id: number;
            title: string;
            price: number;
            description: string;
            category: string;
            thumbnail?: string;
            images?: string[];
          }): Product => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.thumbnail || (item.images && item.images[0]) || "",
          })
        );
      }
    }
  } catch (error) {
    console.warn("Failed to fetch from live API, falling back to local catalog:", error);
  }

  return FALLBACK_PRODUCTS;
}
