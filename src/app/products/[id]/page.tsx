
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart } from 'lucide-react';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import type { Product } from '@/lib/types';
import { AddToCartButton } from './AddToCartButton';


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={src}
                          alt={`${product.name} image ${index + 1}`}
                          fill
                          className="object-cover"
                          data-ai-hint="product image"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.category}</p>
          </div>
          <p className="text-base">{product.description}</p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-primary">${product.price.toLocaleString()}</p>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(product.reviews[0]?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-2">({product.reviews.length} avis)</span>
            </div>
          </div>
          <AddToCartButton product={product} />
          <Separator />
          
          <Card>
            <CardHeader>
              <CardTitle>Spécifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="font-medium text-muted-foreground">{key}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <ProductRecommendations productDescription={product.description} />
        </div>
      </div>
      
      <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Avis des clients</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                       {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                    </div>
                    <p className="font-semibold">{review.author}</p>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    </div>
  );
}
