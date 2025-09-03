
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
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Smartphone, Tv, WashingMachine, Fan, Watch, Drill } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  const categories = [
    { name: 'Smartphone', href: '/category/smartphones', icon: <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
    { name: 'Téléviseur', href: '/category/televisions', icon: <Tv className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
    { name: 'Gros électroménager', href: '/category/appliances', icon: <WashingMachine className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
    { name: 'Aspirateur', href: '/category/vacuums', icon: <Fan className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
    { name: 'Montre connectée', href: '/category/wearables', icon: <Watch className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
    { name: 'Machine à laver', href: '/category/washing-machines', icon: <Drill className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary" /> },
  ]

  return (
    <div className="flex flex-col">
      <section className="w-full py-4 md:py-8 bg-background">
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
                        <div className="relative w-full h-[250px] md:h-[400px]">
                            <Image src="https://picsum.photos/seed/laptops/1200/400" alt="Back to school" fill className="object-cover rounded-lg" data-ai-hint="laptops on desk"/>
                             <div className="absolute inset-0 bg-primary/80 rounded-lg"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center space-y-1 md:space-y-2 w-full px-4">
                                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold" style={{fontFamily: "'Arial Black', Gadget, sans-serif"}}>BACK TO SCHOOL</h1>
                                <p className="text-lg sm:text-xl md:text-2xl font-light">UNE RENTRÉE PARFAITE...</p>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold">CHEZ ELECTROPLANET</p>
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full mt-2 md:mt-4 !px-6 md:!px-8 text-sm md:text-base">
                                    <Link href="#">
                                        J'en profite
                                    </Link>
                                </Button>
                             </div>
                        </div>
                    </CarouselItem>
                     <CarouselItem>
                        <div className="relative w-full h-[250px] md:h-[400px]">
                            <Image src="https://picsum.photos/seed/laptopdeal/1200/400" alt="Offres technologiques" fill className="object-cover rounded-lg" data-ai-hint="person using laptop"/>
                            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                             <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 text-white space-y-2 md:space-y-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">Nouvelles Offres</h1>
                                <p className="text-lg sm:text-xl md:text-2xl">Découvrez nos derniers produits.</p>
                                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-sm md:text-base">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-primary text-primary-foreground text-center p-6 flex flex-col items-center justify-center rounded-lg min-h-[150px] sm:min-h-[240px]">
                    <h2 className="text-4xl md:text-5xl font-extrabold">PETIT</h2>
                    <p className="text-3xl md:text-4xl font-extrabold">PRIX</p>
                    <ArrowRight className="mt-2 h-8 w-8"/>
                </Card>
                <Card className="relative p-4 flex flex-col justify-between rounded-lg bg-cover bg-center min-h-[150px] sm:min-h-[144px]" style={{backgroundImage: "url('https://picsum.photos/seed/laptopbanner/400/144')"}} data-ai-hint="gaming laptop sale">
                     <div className="bg-black/20 absolute inset-0 rounded-lg"></div>
                    <div className="relative z-10 text-white">
                        <h3 className="font-bold text-lg">SUMMER WAVE</h3>
                        <p className="text-sm">du 1er Août au 7 Sep 2025</p>
                    </div>
                    <div className="flex justify-end relative z-10">
                         <ArrowRight className="h-6 w-6 text-white"/>
                    </div>
                </Card>
            </div>
          </div>
        </div>
      </section>
      
       <section className="w-full py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-6xl"
            >
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.name} className="basis-1/3 sm:basis-1/4 md:basis-1/6">
                    <Link href={category.href} className="group flex flex-col items-center justify-center gap-2 text-center">
                       <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card border flex items-center justify-center group-hover:border-primary transition-colors">
                          {category.icon}
                       </div>
                      <h3 className="text-xs sm:text-sm font-semibold">{category.name}</h3>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 sm:-left-4 hidden sm:flex" />
              <CarouselNext className="-right-2 sm:-right-4 hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="#" className="block rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/seed/newlaptops/600/300" width={600} height={300} alt="New Laptops" className="w-full h-auto" data-ai-hint="new laptops" />
                </Link>
                <div className="flex flex-col gap-4">
                    <Link href="#" className="block rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/phones/600/142" width={600} height={142} alt="Smartphones" className="w-full h-auto" data-ai-hint="smartphones" />
                    </Link>
                    <Link href="#" className="block rounded-lg overflow-hidden">
                        <Image src="https://picsum.photos/seed/tablets/600/142" width={600} height={142} alt="Tablets" className="w-full h-auto" data-ai-hint="tablets" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      <section className="w-full py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="#" className="block">
              <Image src="https://picsum.photos/seed/keyboard-sale/600/150" alt="Gaming Keyboards" width={600} height={150} className="w-full h-auto rounded-lg" data-ai-hint="gaming keyboard" />
            </Link>
            <Link href="#" className="block">
              <Image src="https://picsum.photos/seed/laptop-offers/600/150" alt="Laptop Offers" width={600} height={150} className="w-full h-auto rounded-lg" data-ai-hint="laptop sale" />
            </Link>
          </div>
        </div>
      </section>


      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre sélection</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Découvrez notre sélection des meilleures nouveautés technologiques.
            </p>
          </div>
          <div className="mx-auto max-w-xs sm:max-w-2xl lg:max-w-6xl px-4 py-12">
             <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-8"/>
              <CarouselNext className="hidden sm:flex -right-8"/>
            </Carousel>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="bg-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 text-center md:text-left">
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1 mb-4 rounded">
                  <span className="font-bold">Back To School</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">Il y a de la puissance dans l'air.</h3>
                <p className="text-2xl mt-2">À seulement <span className="font-bold">8 590 MAD.</span></p>
                <div className="mt-6 flex justify-center md:justify-start">
                    <Image src="https://picsum.photos/seed/maclogo/150/40" alt="MacBook Air Logo" width={150} height={40} data-ai-hint="apple logo"/>
                </div>
              </div>
               <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image src="https://picsum.photos/seed/macbook/600/400" alt="Macbook Air" layout="fill" objectFit="cover" data-ai-hint="macbook air laptop"/>
                  <div className="absolute bottom-6 right-6">
                    <Button asChild size="lg" variant="outline" className="bg-white/90 hover:bg-white rounded-full border-2 border-gray-300 !px-8 text-black">
                        <Link href="#">J'en profite</Link>
                    </Button>
                  </div>
               </div>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}
