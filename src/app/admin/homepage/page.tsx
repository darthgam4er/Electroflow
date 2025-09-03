
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getSlides, getHomepageCategories, deleteHomepageCategory } from './actions';
import type { HeroSlide, HomepageCategory } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import { DeleteCategoryButton } from './DeleteCategoryButton';

export default async function AdminHomepagePage() {
  const slides = await getSlides();
  const categories = await getHomepageCategories();

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
            {slides.length > 0 ? (
              slides.map((slide) => (
                <div key={slide.id} className="flex items-center gap-4 p-2 border rounded-md">
                  <Image src={slide.imgSrc} width={100} height={50} alt={slide.alt} className="rounded-md object-cover h-[50px] w-[100px]"/>
                  <p className="flex-grow font-medium">{slide.title}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/homepage/${slide.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              ))
            ) : (
                <p className="text-sm text-muted-foreground">No slides found. Add one to get started.</p>
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
           {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="flex items-center gap-4 p-2 border rounded-md">
                   <Image src={category.imgSrc} width={40} height={40} alt={category.name} className="rounded-full object-cover h-10 w-10"/>
                  <p className="flex-grow font-medium">{category.name}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/homepage/categories/${category.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteCategoryButton id={category.id} />
                </div>
              ))
            ) : (
                <p className="text-sm text-muted-foreground">No featured categories found. Add one to get started.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
