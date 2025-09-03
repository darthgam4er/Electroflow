
'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Ajouté au panier',
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <Button 
      size="lg" 
      onClick={handleAddToCart}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Ajouter au panier
    </Button>
  );
}
