import type { Ad, Seller } from './types';

const sellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Modern Electronics',
    avatarUrl: 'https://picsum.photos/seed/seller1/100/100',
    email: 'contact@modernelectronics.com',
    phone: '+8801712345678',
    whatsapp: '+8801712345678',
    location: 'GEC Circle, Chattogram',
    rating: 4.8,
    reviews: 125,
  },
  {
    id: 'seller-2',
    name: 'Fashion Hub Ctg',
    avatarUrl: 'https://picsum.photos/seed/seller2/100/100',
    email: 'support@fashionhub.com',
    phone: '+8801812345679',
    whatsapp: '+8801812345679',
    location: 'Agrabad, Chattogram',
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 'seller-3',
    name: 'Home Decor BD',
    avatarUrl: 'https://picsum.photos/seed/seller3/100/100',
    email: 'info@homedecorbd.com',
    phone: '+8801912345680',
    whatsapp: '+8801912345680',
    location: 'Hathazari, Chattogram',
    rating: 4.9,
    reviews: 210,
  },
];

const ads: Ad[] = [
  {
    id: 'ad-1',
    title: 'Brand New 14" Laptop',
    description: 'Latest model with 16GB RAM, 512GB SSD. Perfect for students and professionals. Sealed box with 1 year warranty.',
    price: 85000,
    imageUrl: 'https://picsum.photos/seed/ad1/600/400',
    sellerId: 'seller-1',
    category: 'Electronics',
    location: 'GEC Circle, Chattogram',
  },
  {
    id: 'ad-2',
    title: 'Men\'s Premium Leather Jacket',
    description: '100% genuine leather jacket. Available in M, L, XL sizes. Limited stock available.',
    price: 4500,
    imageUrl: 'https://picsum.photos/seed/ad2/600/400',
    sellerId: 'seller-2',
    category: 'Fashion',
    location: 'Agrabad, Chattogram',
  },
  {
    id: 'ad-3',
    title: 'Handcrafted Wooden Chair',
    description: 'Elegant and durable wooden chair made from Segun wood. Adds a classic touch to your home.',
    price: 7800,
    imageUrl: 'https://picsum.photos/seed/ad3/600/400',
    sellerId: 'seller-3',
    category: 'Furniture',
    location: 'Hathazari, Chattogram',
  },
  {
    id: 'ad-4',
    title: 'Wireless Bluetooth Headphones',
    description: 'Noise-cancelling headphones with 20 hours of battery life. Crystal clear sound quality.',
    price: 3200,
    imageUrl: 'https://picsum.photos/seed/ad4/600/400',
    sellerId: 'seller-1',
    category: 'Electronics',
    location: 'GEC Circle, Chattogram',
  },
  {
    id: 'ad-5',
    title: 'Designer Women\'s Handbag',
    description: 'A stylish and spacious handbag for every occasion. High-quality synthetic leather.',
    price: 2500,
    imageUrl: 'https://picsum.photos/seed/ad5/600/400',
    sellerId: 'seller-2',
    category: 'Fashion',
    location: 'Agrabad, Chattogram',
  },
  {
    id: 'ad-6',
    title: 'Minimalist Wall Clock',
    description: 'Modern wall clock, silent movement. Perfect for living room or office. 12-inch diameter.',
    price: 1500,
    imageUrl: 'https://picsum.photos/seed/ad6/600/400',
    sellerId: 'seller-3',
    category: 'Home Decor',
    location: 'Hathazari, Chattogram',
  },
    {
    id: 'ad-7',
    title: 'Gaming Mouse with RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting. 16000 DPI sensor.',
    price: 2800,
    imageUrl: 'https://picsum.photos/seed/ad7/600/400',
    sellerId: 'seller-1',
    category: 'Electronics',
    location: 'Sitakunda, Chattogram',
  },
  {
    id: 'ad-8',
    title: 'Summer Collection T-shirt',
    description: 'Comfortable cotton T-shirt, perfect for summer. Various designs available.',
    price: 800,
    imageUrl: 'https://picsum.photos/seed/ad8/600/400',
    sellerId: 'seller-2',
    category: 'Fashion',
    location: 'Boalkhali, Chattogram',
  },
];

export function getAds(): Ad[] {
  return ads;
}

export function getAdById(id: string): Ad | undefined {
  return ads.find(ad => ad.id === id);
}

export function getSellerById(id: string): Seller | undefined {
  return sellers.find(seller => seller.id === id);
}

export function getAdsBySellerId(sellerId: string): Ad[] {
  return ads.filter(ad => ad.sellerId === sellerId);
}
