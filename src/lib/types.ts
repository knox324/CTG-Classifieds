
export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  category: string;
  location: string;
}

export interface Seller {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  rating: number;
  reviews: number;
}

export interface AdWithSeller extends Ad {
  seller: Seller;
}

export interface Category {
    name: string;
    subcategories: string[];
}
