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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ImageUpload"
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const slideSchema = z.object({
  imgSrc: z.string().min(1, { message: "An image is required." }),
  alt: z.string().min(1, { message: "Alt text is required." }),
  dataAiHint: z.string().min(1, { message: "AI hint is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  subtitle: z.string().min(1, { message: "Subtitle is required." }),
  ctaText: z.string().min(1, { message: "CTA text is required." }),
  ctaLink: z.string().min(1, { message: "CTA link is required." }),
  titleClassName: z.string().optional(),
  subtitleClassName: z.string().optional(),
  containerClassName: z.string().optional(),
  tag: z.enum(['Promo', 'Nouveau']).optional(),
})

type SlideFormValues = z.infer<typeof slideSchema>

export default function EditSlidePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      titleClassName: '',
      subtitleClassName: '',
      containerClassName: '',
      tag: undefined,
    },
  });

  async function onSubmit(data: SlideFormValues) {
    setIsSubmitting(true);
    try {
      // For now, just show success message
      toast({
        title: "Slide Updated",
        description: "The slide has been updated successfully.",
      });
      router.push('/admin/homepage');
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentValues = form.watch();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/homepage">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Hero Slide</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Slide Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="imgSrc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value ? [field.value] : []}
                            onChange={(urls) => field.onChange(urls[0])}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload a high-quality image (recommended: 1200x400px)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Back to school laptops" {...field} />
                        </FormControl>
                        <FormDescription>
                          Descriptive text for accessibility and SEO
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataAiHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AI Image Hint</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. laptops on desk" {...field} />
                        </FormControl>
                        <FormDescription>
                          Hint for AI image generation services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Content Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Slide Content</CardTitle>
                </CardHeader>
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
                        <FormDescription>
                          Main headline text (appears large on the slide)
                        </FormDescription>
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
                        <FormDescription>
                          Supporting text below the title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tag (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Promo">Promo</SelectItem>
                            <SelectItem value="Nouveau">Nouveau</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Optional promotional tag to display on the slide
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Call to Action Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Call to Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. J'en profite" {...field} />
                        </FormControl>
                        <FormDescription>
                          Text displayed on the action button
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ctaLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Link</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. /category/laptops or #" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL or route where the button leads
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Styling Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Styling (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titleClassName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title CSS Classes</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. font-bold text-4xl" {...field} />
                        </FormControl>
                        <FormDescription>
                          Custom CSS classes for the title styling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subtitleClassName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle CSS Classes</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. text-lg font-light" {...field} />
                        </FormControl>
                        <FormDescription>
                          Custom CSS classes for the subtitle styling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="containerClassName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Container CSS Classes</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. bg-black/50" {...field} />
                        </FormControl>
                        <FormDescription>
                          Custom CSS classes for the overlay styling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" type="button" onClick={() => router.push('/admin/homepage')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Updating...' : 'Update Slide'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden border">
                {currentValues.imgSrc ? (
                  <>
                    <img
                      src={currentValues.imgSrc}
                      alt={currentValues.alt || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${currentValues.containerClassName || 'bg-black/40'}`}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                      {currentValues.tag && (
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {currentValues.tag}
                        </span>
                      )}
                      <h1 className={`text-2xl font-bold mb-2 ${currentValues.titleClassName || ''}`}>
                        {currentValues.title || 'Your Title Here'}
                      </h1>
                      <p className={`text-lg mb-4 ${currentValues.subtitleClassName || ''}`}>
                        {currentValues.subtitle || 'Your subtitle here'}
                      </p>
                      {currentValues.ctaText && (
                        <Button className="bg-white text-black hover:bg-white/90">
                          {currentValues.ctaText}
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    <p className="text-sm">Upload an image to see preview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
