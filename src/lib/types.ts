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

export interface HeroSlide {
    id: string;
    imgSrc: string;
    alt: string;
    dataAiHint: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    titleClassName?: string;
    subtitleClassName?: string;
    containerClassName?: string;
    tag?: 'Promo' | 'Nouveau';
}

export interface HomepageCategory {
    id: string;
    name: string;
    href: string;
    imgSrc: string;
    dataAiHint?: string;
}

export interface StaticBanner {
  id: string;
  name: string;
  imgSrc: string;
  alt: string;
  width: number;
  height: number;
  link?: string;
  dataAiHint?: string;
  section: 'appliances' | 'gaming' | 'macbook';
  position: 'left' | 'right' | 'top' | 'bottom';
}
