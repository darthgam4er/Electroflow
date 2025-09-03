
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Ajouté au panier',
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const originalPrice = product.price * (1 + (product.discount ?? 0));
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-transparent group-hover:border-primary hover:scale-105">
        <CardHeader className="p-2">
           <div className="relative w-full aspect-square">
            {product.tag && (
                 <Badge 
                    variant={product.tag === 'Nouveau' ? 'destructive' : 'default'}
                    className="absolute top-2 left-2 z-10"
                    style={product.tag !== 'Nouveau' ? { backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' } : {}}
                >
                    {product.tag}
                </Badge>
            )}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
              data-ai-hint="product image"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <p className="text-sm font-semibold mb-2 line-clamp-2 h-10">{product.name}</p>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
             {hasDiscount && (
              <p className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} DH
              </p>
            )}
            <div className="flex justify-between items-center w-full">
                 <p className="text-lg font-bold text-primary">{product.price.toLocaleString()} DH</p>
                {hasDiscount && (
                    <Badge variant="destructive" className="rounded-full">-{Math.round(product.discount! * 100)}%</Badge>
                )}
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
