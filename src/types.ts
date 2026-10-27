export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  currency: string;
  category: string;
  collectionIds: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  badge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  shipping: string;
  fit: string;
  modelNote: string;
  images: string[];
  tags: string[];
  featured: boolean;
  isNew: boolean;
  stock: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  size: string;
  fit: string;
  helpful: number;
}

export interface CartLine {
  /** stable key: productId::color::size */
  key: string;
  productId: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  maxQuantity: number;
}

export type SortKey =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'best-selling';

export interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  onSaleOnly: boolean;
  inStockOnly: boolean;
}
