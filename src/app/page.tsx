import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getFeaturedProducts, getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Laptop, Smartphone, Watch } from 'lucide-react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const laptopProducts = getProductsByCategory('Laptops');

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 font-headline">
              The Future of Tech, Today.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover the latest in electronics. Unbeatable prices, unmatched quality.
            </p>
            <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
              <Link href="/category/laptops">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Check out our hand-picked selection of the best new tech.
            </p>
          </div>
          <div className="mx-auto max-w-6xl px-4 py-12">
             <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex"/>
              <CarouselNext className="hidden sm:flex"/>
            </Carousel>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-card">
         <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shop by Category</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Find exactly what you're looking for.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
                { name: 'Laptops', href: '/category/laptops', icon: <Laptop className="w-10 h-10"/>, dataAiHint: "laptop" },
                { name: 'Smartphones', href: '/category/smartphones', icon: <Smartphone className="w-10 h-10"/>, dataAiHint: "smartphone" },
                { name: 'Tablets', href: '/category/tablets', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><line x1="12" x2="12" y1="18" y2="18"></line></svg>, dataAiHint: "tablet device" },
                { name: 'Wearables', href: '/category/wearables', icon: <Watch className="w-10 h-10"/>, dataAiHint: "smartwatch" },
                { name: 'Accessories', href: '/category/accessories', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><path d="M12 2v4"></path><path d="M12 20v2"></path><path d="M20 12h2"></path><path d="M2 12h2"></path><circle cx="12" cy="12" r="8"></circle><path d="M12 8a4 4 0 1 0 4 4"></path></svg>, dataAiHint: "headphones" },
            ].map(category => (
                <Link key={category.name} href={category.href}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                    <div className="text-primary transition-colors group-hover:text-accent">
                        {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    </CardContent>
                </Card>
                </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
