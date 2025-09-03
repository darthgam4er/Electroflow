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
        title: "Checkout Unavailable",
        description: "This is a demo application. Checkout functionality is not implemented.",
        variant: "destructive"
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" data-ai-hint="product image" />
                </div>
                <div className="ml-4 flex-grow">
                  <Link href={`/products/${item.id}`} className="font-semibold hover:underline">{item.name}</Link>
                  <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-20 h-9"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end ml-4">
                    <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="mt-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
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
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
