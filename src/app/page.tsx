
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
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { getHomepageCategories, getSlides, getStaticBanners } from './admin/homepage/actions';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getHomepageCategories();
  const slides = await getSlides();
  const staticBanners = await getStaticBanners();

  // Helper function to get banner by section and position
  const getBanner = (section: string, position: string) => {
    return staticBanners.find(banner => banner.section === section && banner.position === position);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with Main Banner */}
      <section className="w-full py-4 md:py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
                <HeroCarousel slides={slides} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-primary text-primary-foreground text-center p-6 flex flex-col items-center justify-center rounded-lg min-h-[150px] sm:min-h-[240px]">
                    <h2 className="text-4xl md:text-5xl font-extrabold">PETIT</h2>
                    <p className="text-3xl md:text-4xl font-extrabold">PRIX</p>
                    <ArrowRight className="mt-2 h-8 w-8"/>
                </Card>
                <Card className="relative p-4 flex flex-col justify-between rounded-lg bg-cover bg-center min-h-[150px] sm:min-h-[144px]" style={{backgroundImage: `url('${getBanner('appliances', 'left')?.imgSrc || 'https://picsum.photos/seed/laptopbanner/400/144'}')`}} data-ai-hint="gaming laptop sale">
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
      
      {/* Category Navigation */}
      <section className="w-full py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Nos Catégories</h2>
          </div>
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
                       <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card border flex items-center justify-center group-hover:border-primary transition-colors overflow-hidden shadow-lg">
                          <Image 
                            src={category.imgSrc} 
                            alt={category.name} 
                            width={100} 
                            height={100} 
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 640px) 80px, 96px"
                          />
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

      {/* Brand Promotions Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Nos Marques Partenaires</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={getBanner('appliances', 'left')?.link || '#'} className="block rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow">
                  <Image 
                    src={getBanner('appliances', 'left')?.imgSrc || 'https://picsum.photos/seed/hisense/600/400'} 
                    width={getBanner('appliances', 'left')?.width || 600} 
                    height={getBanner('appliances', 'left')?.height || 400} 
                    alt={getBanner('appliances', 'left')?.alt || 'Hisense Products'} 
                    className="w-full h-auto" 
                    data-ai-hint={getBanner('appliances', 'left')?.dataAiHint || 'Hisense smart tv appliance'}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                   <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
              </Link>
              <div className="flex flex-col gap-4">
                  <Link href={getBanner('appliances', 'top')?.link || '#'} className="block rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow">
                      <Image 
                        src={getBanner('appliances', 'top')?.imgSrc || 'https://picsum.photos/seed/ufesa/600/192'} 
                        width={getBanner('appliances', 'top')?.width || 600} 
                        height={getBanner('appliances', 'top')?.height || 192} 
                        alt={getBanner('appliances', 'top')?.alt || 'Ufesa Products'} 
                        className="w-full h-auto object-cover" 
                        data-ai-hint={getBanner('appliances', 'top')?.dataAiHint || 'kitchen appliances grill'}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                          <ArrowRight className="h-6 w-6 text-primary" />
                      </div>
                  </Link>
                  <Link href={getBanner('appliances', 'bottom')?.link || '#'} className="block rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow">
                      <Image 
                        src={getBanner('appliances', 'bottom')?.imgSrc || 'https://picsum.photos/seed/elexia/600/192'} 
                        width={getBanner('appliances', 'bottom')?.width || 600} 
                        height={getBanner('appliances', 'bottom')?.height || 192} 
                        alt={getBanner('appliances', 'bottom')?.alt || 'Elexia Products'} 
                        className="w-full h-auto object-cover" 
                        data-ai-hint={getBanner('appliances', 'bottom')?.dataAiHint || 'kettle toaster mixer'}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                          <ArrowRight className="h-6 w-6 text-primary" />
                      </div>
                  </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Back to School Special Section */}
      <section className="w-full py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Back to School - Offres Spéciales</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href={getBanner('gaming', 'left')?.link || '#'} className="block rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow bg-white">
              <Image 
                src={getBanner('gaming', 'left')?.imgSrc || 'https://picsum.photos/seed/keyboard-sale/600/150'} 
                alt={getBanner('gaming', 'left')?.alt || 'Gaming Keyboards'} 
                width={getBanner('gaming', 'left')?.width || 600} 
                height={getBanner('gaming', 'left')?.height || 150} 
                className="w-full h-auto rounded-t-lg" 
                data-ai-hint={getBanner('gaming', 'left')?.dataAiHint || 'gaming keyboard'}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Rapoo Gaming Set</h3>
                <p className="text-sm text-gray-600 mb-2">Clavier + Souris Gaming</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">169 DH</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </Link>
            <Link href={getBanner('gaming', 'right')?.link || '#'} className="block rounded-lg overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow bg-white">
              <Image 
                src={getBanner('gaming', 'right')?.imgSrc || 'https://picsum.photos/seed/laptop-offers/600/150'} 
                alt={getBanner('gaming', 'right')?.alt || 'Laptop Offers'} 
                width={getBanner('gaming', 'right')?.width || 600} 
                height={getBanner('gaming', 'right')?.height || 150} 
                className="w-full h-auto rounded-t-lg" 
                data-ai-hint={getBanner('gaming', 'right')?.dataAiHint || 'laptop sale'}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">ASUS VIVOBOOK</h3>
                <p className="text-sm text-gray-600 mb-2">Ordinateur Portable + Sac + Souris</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">2799 DH</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products - Main Product Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre Sélection</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Découvrez notre sélection des meilleures nouveautés technologiques.
            </p>
          </div>
          <div className="mx-auto max-w-xs sm:max-w-2xl lg:max-w-6xl px-4">
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
      
      {/* MacBook Special Section */}
      <section className="w-full py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="bg-card overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 text-center md:text-left">
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1 mb-4 rounded">
                  <span className="font-bold">Back To School</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">Il y a de la puissance dans l'air.</h3>
                <p className="text-2xl mt-2">À seulement <span className="font-bold">8 590 MAD.</span></p>
                <div className="mt-6 flex justify-center md:justify-start">
                    <Image 
                      src={getBanner('macbook', 'left')?.imgSrc || 'https://picsum.photos/seed/maclogo/150/40'} 
                      alt={getBanner('macbook', 'left')?.alt || 'MacBook Air Logo'} 
                      width={getBanner('macbook', 'left')?.width || 150} 
                      height={getBanner('macbook', 'left')?.height || 40} 
                      data-ai-hint={getBanner('macbook', 'left')?.dataAiHint || 'apple logo'}
                      loading="lazy"
                      sizes="150px"
                    />
                </div>
                <p className="text-sm text-muted-foreground mt-2">MacBook Air (Puce M1)</p>
              </div>
               <div className="relative h-64 md:h-full min-h-[300px]">
                  <Image 
                    src={getBanner('macbook', 'right')?.imgSrc || 'https://picsum.photos/seed/macbook/600/400'} 
                    alt={getBanner('macbook', 'right')?.alt || 'Macbook Air'} 
                    fill 
                    className="object-cover"
                    data-ai-hint={getBanner('macbook', 'right')?.dataAiHint || 'macbook air laptop'}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
