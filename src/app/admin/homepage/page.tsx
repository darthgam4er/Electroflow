
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSlides, seedSlides } from './actions';
import type { HeroSlide } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminHomepagePage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSlides() {
      setLoading(true);
      let fetchedSlides = await getSlides();
      if (fetchedSlides.length === 0) {
        console.log("No slides found, seeding database...");
        await seedSlides();
        fetchedSlides = await getSlides();
      }
      setSlides(fetchedSlides);
      setLoading(false);
    }
    loadSlides();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Homepage Management</h1>
        {/* Save changes might be needed for featured sections later */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hero Carousel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Manage the slides in your main homepage carousel.
          </p>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-2 border rounded-md">
                  <Skeleton className="h-[50px] w-[100px] rounded-md"/>
                  <Skeleton className="h-4 w-48 flex-grow" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))
            ) : (
              slides.map((slide) => (
                <div key={slide.id} className="flex items-center gap-4 p-2 border rounded-md">
                  <Image src={slide.imgSrc} width={100} height={50} alt={slide.alt} className="rounded-md object-cover h-[50px] w-[100px]"/>
                  <p className="flex-grow font-medium">{slide.title}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/homepage/${slide.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              ))
            )}
          </div>
          {/* We might add an "Add New Slide" button here in the future */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Featured Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Customize the promotional sections on your homepage.
          </p>
          <p className="text-sm text-center text-muted-foreground py-8">
            Homepage featured section management UI goes here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
