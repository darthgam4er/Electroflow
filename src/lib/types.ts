export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
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
