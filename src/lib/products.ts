import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'ASUS VIVOBOOK K X515SK 15',
    description:
      'The QuantumBook Pro X is the pinnacle of performance and design. With its next-gen processor and stunning Retina XDR display, it\'s the ultimate tool for creatives and professionals.',
    price: 2699,
    discount: 0.20,
    tag: 'Promo',
    images: ['https://picsum.photos/seed/laptop1/800/800', 'https://picsum.photos/seed/laptop2/800/800', 'https://picsum.photos/seed/laptop3/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      CPU: 'Quantum Fusion A1',
      RAM: '32GB Unified Memory',
      Storage: '1TB NVMe SSD',
      Display: '16-inch Liquid Retina XDR',
      Ports: '3x Thunderbolt 5, HDMI, SDXC Card Slot',
    },
    reviews: [
      { rating: 5, text: 'Absolutely breathtaking performance!', author: 'Tech Guru' },
      { rating: 5, text: 'The display is unlike anything I have ever seen.', author: 'Designer D' },
    ],
  },
  {
    id: '2',
    name: 'LENOVO IDEAPAD1 ISL JLT CEL N...',
    description:
      'Experience the future of mobile with the StellarPhone 12. Its advanced camera system, all-day battery life, and blazing fast 6G connectivity set a new standard.',
    price: 3199,
    discount: 0.13,
    tag: 'Promo',
    images: ['https://picsum.photos/seed/lenovo1/800/800', 'https://picsum.photos/seed/lenovo2/800/800', 'https://picsum.photos/seed/lenovo3/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      Processor: 'Stellar A18 Bionic',
      Display: '6.7-inch Super-Luminance OLED',
      Camera: '48MP Pro-Grade Triple-Camera System',
      Battery: '4500 mAh with HyperCharge',
      Connectivity: '6G, Wi-Fi 7',
    },
    reviews: [
      { rating: 5, text: 'The camera is a game-changer!', author: 'PhotoPhil' },
      { rating: 4, text: 'Incredibly fast and responsive.', author: 'GadgetGirl' },
    ],
  },
  {
    id: '3',
    name: 'ASUS PC ASUSVIVOB OOK G410K...',
    description: 'Immerse yourself in pure, high-fidelity audio with SonicSurge. Industry-leading noise cancellation and a 40-hour battery life let you escape into your music.',
    price: 2699,
    discount: 0.27,
    tag: 'Promo',
    images: ['https://picsum.photos/seed/asuspc1/800/800', 'https://picsum.photos/seed/asuspc2/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      'Audio Technology': 'Active Noise Cancellation, Spatial Audio',
      'Play Time': 'Up to 40 hours',
      Connectivity: 'Bluetooth 5.4',
      Weight: '250g',
    },
    reviews: [{ rating: 5, text: 'Best noise cancelling headphones I have ever owned.', author: 'AudioPhile' }],
  },
  {
    id: '4',
    name: 'ASUS PC ASUS VIVOB OOK X15...',
    description:
      'Light as air, powerful as a storm. The AeroBook Air redefines portability without compromising on power, making it the perfect companion for those on the go.',
    price: 5999,
    discount: 0.14,
    tag: 'Nouveau',
    images: ['https://picsum.photos/seed/laptop4/800/800', 'https://picsum.photos/seed/laptop5/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      CPU: 'Aero M3 Chip',
      RAM: '16GB Unified Memory',
      Storage: '512GB SSD',
      Display: '13.6-inch Liquid Retina',
    },
    reviews: [{ rating: 5, text: 'So light I forget it\'s in my bag!', author: 'Frequent Flyer' }],
  },
  {
    id: '5',
    name: 'HP INTEL® CORE™ I5 P RO...',
    description:
      'Your digital canvas awaits. The PixelPerfect Tablet with its ultra-responsive stylus offers an unparalleled drawing and note-taking experience.',
    price: 6799,
    discount: 0.13,
    tag: 'Promo',
    images: ['https://picsum.photos/seed/hp1/800/800', 'https://picsum.photos/seed/hp2/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      Processor: 'Octa-Core Graphics Pro',
      Display: '11-inch TrueTone Display',
      Storage: '256GB',
      'Special Feature': 'PixelPoint Stylus included',
    },
    reviews: [{ rating: 5, text: 'The best drawing experience on a tablet.', author: 'Artist' }],
  },
  {
    id: '6',
    name: 'MSI MSI MODERN 14" I 5 123...',
    description: 'Stay connected, stay healthy. The ChronoWatch Series 8 tracks your fitness, monitors your health, and keeps you in touch with what matters most.',
    price: 6499,
    discount: 0.13,
    tag: 'Promo',
    images: ['https://picsum.photos/seed/msi1/800/800', 'https://picsum.photos/seed/msi2/800/800'],
    category: 'Laptops',
    featured: true,
    specs: {
      Sensors: 'Heart Rate, Blood Oxygen, ECG',
      'Water Resistance': '50 meters',
      'Battery Life': 'Up to 36 hours',
      Display: 'Always-On Retina Display',
    },
    reviews: [{ rating: 5, text: 'A life-saver, literally.', author: 'FitnessFanatic' }],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getProductsByCategory = (category: string) => products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
export const getFeaturedProducts = () => products.filter((p) => p.featured);
