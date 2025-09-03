
import type { Product } from './types';

export const sampleProducts: Omit<Product, 'id'>[] = [
  {
    name: 'ASUS VIVOBOOK S15',
    description: 'Le PC Portable Asus VivoBook S15 vous permet d\'exprimer votre vrai style, avec son design audacieux, ses finitions colorées et sa touche Entrée jaune qui sort de l\'ordinaire. Ses performances, alimentées par un processeur Intel Core i5 et un SSD de 512 Go, vous offrent la puissance dont vous avez besoin pour accomplir vos tâches.',
    price: 8990,
    images: ['https://picsum.photos/seed/vivobook1/600/400', 'https://picsum.photos/seed/vivobook2/600/400'],
    category: 'Laptops',
    featured: true,
    tag: 'Promo',
    discount: 0.15,
    specs: {
      "Processeur": "Intel Core i5-1135G7",
      "RAM": "8 Go",
      "Stockage": "512 Go SSD",
      "Écran": "15.6\" FHD",
      "OS": "Windows 11"
    },
    reviews: [
        { rating: 5, author: 'Karim', text: 'Excellent ordinateur portable, rapide et léger.'},
        { rating: 4, author: 'Amina', text: 'Très bon rapport qualité-prix.'}
    ]
  },
  {
    name: 'PC Portable Gamer HP VICTUS 15',
    description: 'Le PC portable gamer HP Victus 15 est conçu pour le jeu de haut niveau. Avec son processeur Intel Core i5, sa carte graphique NVIDIA GeForce RTX 3050, son système de refroidissement amélioré et son écran Full HD rapide, il a tout pour plaire.',
    price: 9990,
    images: ['https://picsum.photos/seed/victus1/600/400', 'https://picsum.photos/seed/victus2/600/400'],
    category: 'Laptops',
    featured: true,
    tag: 'Nouveau',
    specs: {
       "Processeur": "Intel Core i5-12450H",
      "RAM": "16 Go",
      "Stockage": "512 Go SSD",
      "GPU": "NVIDIA GeForce RTX 3050",
      "Écran": "15.6\" FHD 144Hz"
    },
    reviews: [
        { rating: 5, author: 'Youssef', text: 'Fait tourner tous les jeux récents sans problème.'}
    ]
  },
  {
    name: 'MacBook Air M1 13"',
    description: 'Le MacBook Air, notre ordinateur portable le plus fin et le plus léger, est métamorphosé par la puce Apple M1. Il est doté d’un CPU jusqu’à 3,5 fois plus rapide et d’un GPU jusqu’à 5 fois plus rapide. Et d’un Neural Engine jusqu’à 9 fois plus rapide, pour des performances d’apprentissage automatique époustouflantes. Il n’a jamais été aussi autonome. Et son design silencieux, sans ventilateur, n’a jamais été aussi parfait.',
    price: 11290,
    images: ['https://picsum.photos/seed/macbook1/600/400', 'https://picsum.photos/seed/macbook2/600/400'],
    category: 'Laptops',
    featured: true,
    tag: 'Promo',
    discount: 0.10,
    specs: {
      "Processeur": "Apple M1",
      "RAM": "8 Go",
      "Stockage": "256 Go SSD",
      "Écran": "13.3\" Retina"
    },
    reviews: [
        { rating: 5, author: 'Fatima', text: 'Incroyable, l\'autonomie est folle.'},
        { rating: 5, author: 'Mehdi', text: 'La puce M1 change tout, une fluidité exemplaire.'}
    ]
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'Capturez la nuit, même en basse lumière. Le mode Nuit du Galaxy S23 Ultra, doté d\'une IA améliorée, garde les détails nets, de sorte que les photos et vidéos en basse lumière seront lumineuses et colorées.',
    price: 8490,
    images: ['https://picsum.photos/seed/s23/600/400'],
    category: 'Smartphones',
    featured: true,
    tag: 'Nouveau',
    specs: {
        "Écran": "6.8\" Dynamic AMOLED 2X",
        "Processeur": "Snapdragon 8 Gen 2 for Galaxy",
        "Stockage": "256 Go",
        "Caméra": "200MP"
    },
    reviews: []
  },
    {
    name: 'Sony WH-1000XM5',
    description: 'Le casque Sony WH-1000XM5 offre une réduction de bruit de pointe, un son exceptionnel et des appels d\'une clarté cristalline. Avec deux processeurs contrôlant huit microphones, Auto NC Optimizer pour une réduction de bruit optimisée automatiquement en fonction des conditions de port et de l\'environnement, et un diaphragme spécialement conçu.',
    price: 3990,
    images: ['https://picsum.photos/seed/sony-xm5/600/400'],
    category: 'Audio',
    featured: false,
    specs: {
      "Type": "Casque à réduction de bruit",
      "Autonomie": "30 heures",
      "Connectivité": "Bluetooth 5.2"
    },
    reviews: [
      { rating: 5, author: 'Leila', text: 'La meilleure réduction de bruit du marché, sans conteste.' }
    ]
  },
  {
    name: 'Apple iPad Air (5e génération)',
    description: 'La puce M1. Un écran Liquid Retina de 10,9 pouces immersif. Une caméra avant ultra grand-angle 12 Mpx avec Cadre centré. Et cinq superbes couleurs.',
    price: 7290,
    images: ['https://picsum.photos/seed/ipad-air/600/400'],
    category: 'Tablets',
    featured: false,
    tag: 'Promo',
    discount: 0.05,
    specs: {
      "Puce": "Apple M1",
      "Écran": "10.9\" Liquid Retina",
      "Stockage": "64 Go",
      "Connectivité": "Wi-Fi 6"
    },
    reviews: []
  },
  {
    name: 'Apple Watch Series 8',
    description: 'Votre compagnon essentiel est maintenant encore plus puissant. Il intègre un capteur de température pour des informations plus précises sur le bien-être féminin, la détection des accidents pour appeler les secours en cas d’urgence, et des données d’entraînement avancées pour vous aider à rester actif et en forme.',
    price: 4890,
    images: ['https://picsum.photos/seed/apple-watch-8/600/400'],
    category: 'Wearables',
    featured: false,
    specs: {
      "Boîtier": "45 mm ou 41 mm",
      "Écran": "OLED LTPO Retina toujours activé",
      "Capteurs": "Température, ECG, Oxygène sanguin"
    },
    reviews: []
  },
  {
    name: 'Réfrigérateur Combiné Samsung',
    description: 'Le réfrigérateur Samsung offre une capacité de 344L et la technologie SpaceMax pour plus d\'espace de stockage intérieur sans augmenter les dimensions extérieures. Le froid ventilé intégral assure une température homogène et constante.',
    price: 6490,
    images: ['https://picsum.photos/seed/samsung-fridge/600/400'],
    category: 'Appliances',
    featured: true,
    tag: 'Promo',
    discount: 0.20,
    specs: {
      "Capacité": "344 L",
      "Type de froid": "Ventilé Plus (No Frost)",
      "Classe énergétique": "F",
      "Niveau sonore": "35 dB"
    },
    reviews: []
  }
];
