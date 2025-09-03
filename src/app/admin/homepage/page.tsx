
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getSlides, getHomepageCategories } from './actions';
import type { HeroSlide, HomepageCategory } from '@/lib/types';
import { DeleteCategoryButton } from './DeleteCategoryButton';
import { DeleteSlideButton } from './DeleteSlideButton';
import { SeedDatabaseButton } from './SeedDatabaseButton';

export default async function AdminHomepagePage() {
  const slides = await getSlides();
  const categories = await getHomepageCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Homepage Management</h1>
      </div>
      
      {/* Hero Carousel Management */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Hero Carousel</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/homepage/slides/new">Add New Slide</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Manage the slides in your main homepage carousel. Drag and drop to reorder slides.
          </p>
          <div className="space-y-4">
            {slides.length > 0 ? (
              slides.map((slide, index) => (
                <div key={slide.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    <Image 
                      src={slide.imgSrc} 
                      width={120} 
                      height={60} 
                      alt={slide.alt} 
                      className="rounded-md object-cover h-[60px] w-[120px]"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Slide {index + 1}
                      </span>
                      {slide.tag && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {slide.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg truncate">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      CTA: {slide.ctaText} → {slide.ctaLink}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/homepage/slides/${slide.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteSlideButton id={slide.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-2">No slides found</p>
                <Button asChild>
                  <Link href="/admin/homepage/slides/new">Create Your First Slide</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Featured Categories Management */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Featured Categories</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/homepage/categories/new">Add Category</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Manage the category icons displayed on the homepage. These appear in the category carousel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0">
                    <Image 
                      src={category.imgSrc} 
                      width={60} 
                      height={60} 
                      alt={category.name} 
                      className="rounded-full object-cover h-[60px] w-[60px] border-2 border-border"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-lg truncate">{category.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{category.href}</p>
                    {category.dataAiHint && (
                      <p className="text-xs text-muted-foreground mt-1">
                        AI Hint: {category.dataAiHint}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/homepage/categories/${category.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteCategoryButton id={category.id} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-2">No featured categories found</p>
                <Button asChild>
                  <Link href="/admin/homepage/categories/new">Create Your First Category</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col items-center gap-2">
              <Link href="/admin/homepage/slides/new">
                <span className="text-2xl">🖼️</span>
                <span className="font-semibold">Add New Slide</span>
                <span className="text-sm text-muted-foreground text-center">
                  Create a new hero carousel slide
                </span>
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col items-center gap-2">
              <Link href="/admin/homepage/categories/new">
                <span className="text-2xl">📁</span>
                <span className="font-semibold">Add Category</span>
                <span className="text-sm text-muted-foreground text-center">
                  Add a new featured category
                </span>
              </Link>
            </Button>
            
            <SeedDatabaseButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
