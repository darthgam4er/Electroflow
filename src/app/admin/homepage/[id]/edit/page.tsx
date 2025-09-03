
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { getSlideById, updateSlide } from "../../actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { HeroSlide } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUpload } from "@/components/ImageUpload";

const slideSchema = z.object({
  imgSrc: z.string().min(1, { message: "An image is required." }),
  alt: z.string().min(1, { message: "Alt text is required." }),
  dataAiHint: z.string().optional(),
  title: z.string().min(1, { message: "Title is required." }),
  subtitle: z.string().optional(),
  ctaText: z.string().min(1, { message: "CTA text is required." }),
  ctaLink: z.string().min(1, { message: "CTA link is required." }),
  containerClassName: z.string().optional(),
  titleClassName: z.string().optional(),
  subtitleClassName: z.string().optional(),
})

type SlideFormValues = z.infer<typeof slideSchema>

export default function EditSlidePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [slide, setSlide] = useState<HeroSlide | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
        imgSrc: '',
        alt: '',
        dataAiHint: '',
        title: '',
        subtitle: '',
        ctaText: '',
        ctaLink: '',
        containerClassName: '',
        titleClassName: '',
        subtitleClassName: '',
    },
  });

  useEffect(() => {
    async function loadSlide() {
      setLoading(true);
      const fetchedSlide = await getSlideById(params.id);
      if (fetchedSlide) {
        setSlide(fetchedSlide);
        form.reset(fetchedSlide);
      } else {
        toast({ title: "Error", description: "Slide not found.", variant: "destructive" });
        router.push('/admin/homepage');
      }
      setLoading(false);
    }
    loadSlide();
  }, [params.id, router, form]);


  async function onSubmit(data: SlideFormValues) {
    if (!slide) return;
    const result = await updateSlide(slide.id, data);

    if (result.success) {
        toast({
            title: "Slide Updated",
            description: "The hero slide has been updated successfully.",
        });
        router.push('/admin/homepage');
    } else {
        toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
        });
    }
  }
  
  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-1/4" />
            <Card>
                <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Edit Slide</h1>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Slide Content</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. BACK TO SCHOOL" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Subtitle</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. UNE RENTRÉE PARFAITE..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="ctaText"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CTA Button Text</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. J'en profite" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ctaLink"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CTA Button Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. /category/laptops" {...field} />
                                </FormControl>
                                <FormDescription>Enter a relative path (like /products/promo) or a full URL.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Image and Styling</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={form.control}
                            name="imgSrc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slide Image</FormLabel>
                                    <FormControl>
                                         <ImageUpload 
                                            value={field.value ? [field.value] : []}
                                            onChange={(urls) => field.onChange(urls[0])}
                                         />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image Alt Text</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Laptops on a desk for back to school" {...field} />
                                    </FormControl>
                                    <FormDescription>Important for SEO and accessibility.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="containerClassName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Styling Classes (Advanced)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. bg-primary/80" {...field} />
                                    </FormControl>
                                    <FormDescription>Optional: Add TailwindCSS classes to style the colored overlay.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => router.push('/admin/homepage')}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </Form>
    </div>
  )
}
