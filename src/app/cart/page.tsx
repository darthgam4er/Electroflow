
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
        title: "Paiement non disponible",
        description: "Ceci est une application de démonstration. La fonctionnalité de paiement n'est pas implémentée.",
        variant: "destructive"
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Votre panier</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Votre panier est vide</h2>
          <p className="mt-2 text-muted-foreground">Il semble que vous n'ayez encore rien ajouté à votre panier.</p>
          <Button asChild className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            <Link href="/">Commencer vos achats</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" data-ai-hint="product image" />
                </div>
                <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-grow w-full">
                  <div className="flex justify-between items-start">
                    <Link href={`/products/${item.id}`} className="font-semibold hover:underline text-base sm:text-lg">{item.name}</Link>
                    <p className="font-semibold text-base sm:text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-20 h-9"
                    />
                     <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total ({cartCount} articles)</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleCheckout}
                    style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
                >
                  Passer au paiement
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

    