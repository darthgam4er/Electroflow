export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
  tag?: 'Promo' | 'Nouveau';
  discount?: number; // e.g. 0.2 for 20%
  specs: Record<string, string>;
  reviews: {
    rating: number;
    text: string;
    author: string;
  }[];
}

export interface CartItem extends Product {
  quantity: number;
}
