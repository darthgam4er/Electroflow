
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
import { cn } from '@/lib/utils';
import { getSlides } from '@/app/admin/homepage/actions';
import type { HeroSlide } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [slides, setSlides] = React.useState<HeroSlide[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadSlides() {
      setLoading(true);
      const fetchedSlides = await getSlides();
      setSlides(fetchedSlides);
      setLoading(false);
    }
    loadSlides();
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (loading) {
    return <Skeleton className="w-full h-[250px] md:h-[400px] rounded-lg" />;
  }

  return (
    <div className="relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[250px] md:h-[400px]">
                <Image
                  src={slide.imgSrc}
                  alt={slide.alt}
                  fill
                  priority={slides.indexOf(slide) === 0}
                  className="object-cover rounded-lg"
                  data-ai-hint={slide.dataAiHint}
                />
                <div className={cn("absolute inset-0 bg-black/40 rounded-lg", slide.containerClassName)}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center space-y-1 md:space-y-2 w-full px-4">
                    <h1 className={cn("text-3xl sm:text-4xl md:text-6xl font-extrabold", slide.titleClassName)}>{slide.title}</h1>
                    <p className={cn("text-lg sm:text-xl md:text-2xl font-light", slide.subtitleClassName)}>{slide.subtitle}</p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full mt-2 md:mt-4 !px-6 md:!px-8 text-sm md:text-base">
                        <Link href={slide.ctaLink}>
                            {slide.ctaText}
                        </Link>
                    </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:flex" />
        <CarouselNext className="right-4 hidden sm:flex" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              current === index ? "bg-white w-4" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
