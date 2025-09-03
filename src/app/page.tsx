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

  return (
    <div className="flex flex-col">
      <section className="w-full py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
                <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
                >
                <CarouselContent>
                    <CarouselItem>
                        <div className="relative w-full h-[400px]">
                            <Image src="https://picsum.photos/seed/hero1/1200/400" alt="Summer freshness solution" fill className="object-cover rounded-lg" data-ai-hint="beach scene air conditioner"/>
                             <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                             <div className="absolute top-1/2 left-12 -translate-y-1/2 text-white space-y-4">
                                <h1 className="text-5xl font-bold uppercase" style={{color: '#FFD700'}}>Votre solution</h1>
                                <p className="text-4xl font-light italic">fraîcheur</p>
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                                    <Link href="#">
                                        J'en profite
                                    </Link>
                                </Button>
                             </div>
                        </div>
                    </CarouselItem>
                     <CarouselItem>
                        <div className="relative w-full h-[400px]">
                            <Image src="https://picsum.photos/seed/hero2/1200/400" alt="Tech deals" fill className="object-cover rounded-lg" data-ai-hint="modern living room technology"/>
                            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                             <div className="absolute top-1/2 left-12 -translate-y-1/2 text-white space-y-4">
                                <h1 className="text-5xl font-bold uppercase">Nouvelles Offres</h1>
                                <p className="text-2xl">Découvrez nos derniers produits.</p>
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                                    <Link href="/category/laptops">
                                        Explorer
                                    </Link>
                                </Button>
                             </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4 hidden sm:flex"/>
                <CarouselNext className="right-4 hidden sm:flex"/>
                </Carousel>
            </div>
            <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground text-center p-6 flex flex-col items-center justify-center h-[240px] rounded-lg">
                    <h2 className="text-5xl font-extrabold">PETIT</h2>
                    <p className="text-4xl font-extrabold">PRIX</p>
                    <ArrowRight className="mt-2 h-8 w-8"/>
                </Card>
                <Card className="p-4 flex flex-col justify-between h-[144px] rounded-lg">
                    <div>
                        <h3 className="font-bold text-lg">SUMMER WAVE</h3>
                        <p className="text-sm text-muted-foreground">du 1er Août au 7 Sep 2025</p>
                    </div>
                    <div className="flex justify-end">
                         <ArrowRight className="h-6 w-6"/>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Produits phares</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Découvrez notre sélection des meilleures nouveautés technologiques.
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Acheter par catégorie</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Trouvez exactement ce que vous cherchez.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
                { name: 'Laptops', href: '/category/laptops' },
                { name: 'Smartphones', href: '/category/smartphones' },
                { name: 'Tablets', href: '/category/tablets' },
                { name: 'Wearables', href: '/category/wearables' },
                { name: 'Accessories', href: '/category/accessories' },
            ].map(category => (
                <Link key={category.name} href={category.href}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-4 min-h-[120px]">
                      <h3 className="text-lg font-semibold text-center">{category.name}</h3>
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
