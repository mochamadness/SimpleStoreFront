import { Product, ProductCategory, SkinType } from '../types/Product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Hydrating Vitamin C Serum',
    description: 'A powerful antioxidant serum that brightens skin and reduces signs of aging with 20% Vitamin C and hyaluronic acid.',
    price: 49.99,
    category: ProductCategory.SERUMS,
    brand: 'GlowLab',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['20% L-Ascorbic Acid', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
    skinType: [SkinType.DRY, SkinType.NORMAL, SkinType.MATURE],
    benefits: ['Brightening', 'Anti-aging', 'Hydrating', 'Antioxidant protection'],
    usage: 'Apply 2-3 drops to clean skin in the morning before moisturizer',
    volume: '30ml',
    rating: 4.5,
    reviews: 324
  },
  {
    id: '2',
    name: 'Gentle Foam Cleanser',
    description: 'A mild, sulfate-free cleanser that removes impurities without stripping natural oils. Perfect for sensitive skin.',
    price: 24.99,
    category: ProductCategory.CLEANSERS,
    brand: 'PureSkin',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['Coconut-derived cleansers', 'Aloe Vera', 'Chamomile Extract', 'Glycerin'],
    skinType: [SkinType.SENSITIVE, SkinType.DRY, SkinType.NORMAL],
    benefits: ['Gentle cleansing', 'Soothing', 'Hydrating'],
    usage: 'Use morning and evening. Massage onto wet skin and rinse thoroughly',
    volume: '150ml',
    rating: 4.3,
    reviews: 156
  },
  {
    id: '3',
    name: 'Retinol Night Treatment',
    description: 'Advanced anti-aging treatment with 0.5% retinol to reduce fine lines and improve skin texture overnight.',
    price: 89.99,
    category: ProductCategory.ANTI_AGING,
    brand: 'YouthRx',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['0.5% Retinol', 'Squalane', 'Niacinamide', 'Peptides'],
    skinType: [SkinType.NORMAL, SkinType.OILY, SkinType.MATURE],
    benefits: ['Anti-aging', 'Wrinkle reduction', 'Texture improvement', 'Pore refinement'],
    usage: 'Apply thin layer to clean skin 2-3 times per week in the evening',
    volume: '30ml',
    rating: 4.7,
    reviews: 892
  },
  {
    id: '4',
    name: 'Mineral SPF 50 Sunscreen',
    description: 'Broad-spectrum physical sunscreen with zinc oxide and titanium dioxide. Non-comedogenic and reef-safe.',
    price: 32.99,
    category: ProductCategory.SUNCARE,
    brand: 'SunShield',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['Zinc Oxide 20%', 'Titanium Dioxide 6%', 'Aloe Vera', 'Vitamin E'],
    skinType: [SkinType.SENSITIVE, SkinType.OILY, SkinType.COMBINATION, SkinType.NORMAL],
    benefits: ['Broad-spectrum protection', 'Non-comedogenic', 'Water-resistant', 'Reef-safe'],
    usage: 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours',
    volume: '60ml',
    rating: 4.4,
    reviews: 234
  },
  {
    id: '5',
    name: 'Niacinamide 10% + Zinc Serum',
    description: 'High-strength niacinamide serum to reduce appearance of blemishes and minimize pores for clearer skin.',
    price: 36.99,
    category: ProductCategory.ACNE_TREATMENT,
    brand: 'ClearSkin',
    imageUrl: 'https://images.unsplash.com/photo-1620916297397-fd5d1a7a6d40?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['10% Niacinamide', '1% Zinc PCA', 'Hyaluronic Acid'],
    skinType: [SkinType.OILY, SkinType.COMBINATION],
    benefits: ['Pore minimizing', 'Blemish reduction', 'Oil control', 'Skin texture improvement'],
    usage: 'Apply to entire face morning and evening after cleansing',
    volume: '30ml',
    rating: 4.2,
    reviews: 567
  },
  {
    id: '6',
    name: 'Hydrating Night Moisturizer',
    description: 'Rich, nourishing night cream with ceramides and peptides to repair and restore skin overnight.',
    price: 54.99,
    category: ProductCategory.MOISTURIZERS,
    brand: 'NightCare',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
    inStock: true,
    ingredients: ['Ceramides', 'Peptides', 'Shea Butter', 'Jojoba Oil', 'Vitamin B5'],
    skinType: [SkinType.DRY, SkinType.MATURE, SkinType.NORMAL],
    benefits: ['Deep hydration', 'Skin barrier repair', 'Anti-aging', 'Overnight restoration'],
    usage: 'Apply to clean face and neck in the evening as the last step of skincare routine',
    volume: '50ml',
    rating: 4.6,
    reviews: 445
  }
];

// Initialize with sample data if localStorage is empty
export const initializeProductData = (): Product[] => {
  const stored = localStorage.getItem('products');
  if (!stored) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    return sampleProducts;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : sampleProducts;
};