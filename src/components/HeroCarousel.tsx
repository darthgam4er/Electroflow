
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slides = [
    {
      imgSrc: 'https://picsum.photos/seed/laptops/1200/400',
      alt: 'Back to school',
      dataAiHint: 'laptops on desk',
      content: (
        <>
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
        </>
      ),
    },
    {
      imgSrc: 'https://picsum.photos/seed/laptopdeal/1200/400',
      alt: 'Offres technologiques',
      dataAiHint: 'person using laptop',
      content: (
        <>
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
        </>
      ),
    },
    {
      imgSrc: 'https://picsum.photos/seed/phone-sale/1200/400',
      alt: 'Vente de téléphones',
      dataAiHint: 'smartphone sale',
      content: (
        <>
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          <div className="absolute bottom-10 right-10 text-white text-right space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">Les derniers smartphones</h2>
            <p className="text-md md:text-xl">À des prix imbattables.</p>
            <Button asChild variant="secondary">
                <Link href="/category/smartphones">
                    Voir les offres
                </Link>
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full" opts={{loop: true}}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[250px] md:h-[400px]">
                <Image
                  src={slide.imgSrc}
                  alt={slide.alt}
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint={slide.dataAiHint}
                />
                {slide.content}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:flex" />
        <CarouselNext className="right-4 hidden sm:flex" />
      </Carousel>
      {count > 0 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
            <span>{String(current).padStart(2, '0')}</span> / <span>{String(count).padStart(2, '0')}</span>
          </div>
      )}
    </div>
  );
}
