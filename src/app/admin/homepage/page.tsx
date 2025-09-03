
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSlides, seedSlides, getHomepageCategories, seedHomepageCategories, deleteHomepageCategory } from './actions';
import type { HeroSlide, HomepageCategory } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminHomepagePage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [categories, setCategories] = useState<HomepageCategory[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    let fetchedSlides = await getSlides();
    if (fetchedSlides.length === 0) {
      console.log("No slides found, seeding database...");
      await seedSlides();
      fetchedSlides = await getSlides();
    }

    let fetchedCategories = await getHomepageCategories();
    if (fetchedCategories.length === 0) {
        console.log("No homepage categories found, seeding...");
        await seedHomepageCategories();
        fetchedCategories = await getHomepageCategories();
    }

    setSlides(fetchedSlides);
    setCategories(fetchedCategories);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteHomepageCategory(id);
     if (result.success) {
        toast({
            title: "Category Deleted",
            description: "The category has been deleted successfully.",
        });
        loadData(); // Reload data
    } else {
        toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
        });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Homepage Management</h1>
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
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Featured Categories</CardTitle>
           <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/homepage/categories/new`}>Add Category</Link>
            </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Manage the category icons displayed on the homepage.
          </p>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-2 border rounded-md">
                  <Skeleton className="h-10 w-10 rounded-full"/>
                  <Skeleton className="h-4 w-48 flex-grow" />
                  <Skeleton className="h-8 w-16" />
                   <Skeleton className="h-8 w-8" />
                </div>
              ))
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex items-center gap-4 p-2 border rounded-md">
                   <Image src={category.imgSrc} width={40} height={40} alt={category.name} className="rounded-full object-cover h-10 w-10"/>
                  <p className="flex-grow font-medium">{category.name}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/homepage/categories/${category.id}/edit`}>Edit</Link>
                  </Button>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the category
                                  from the homepage.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
