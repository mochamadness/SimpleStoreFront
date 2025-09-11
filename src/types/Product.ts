export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: string;
  imageUrl: string;
  inStock: boolean;
  ingredients?: string[];
  skinType?: SkinType[];
  benefits?: string[];
  usage?: string;
  volume?: string;
  rating?: number;
  reviews?: number;
}

export enum ProductCategory {
  SKINCARE = 'Skincare',
  MAKEUP = 'Makeup',
  SUNCARE = 'Sun Care',
  ANTI_AGING = 'Anti-Aging',
  ACNE_TREATMENT = 'Acne Treatment',
  MOISTURIZERS = 'Moisturizers',
  CLEANSERS = 'Cleansers',
  SERUMS = 'Serums',
  SUPPLEMENTS = 'Supplements'
}

export enum SkinType {
  DRY = 'Dry',
  OILY = 'Oily',
  COMBINATION = 'Combination',
  SENSITIVE = 'Sensitive',
  NORMAL = 'Normal',
  MATURE = 'Mature'
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}