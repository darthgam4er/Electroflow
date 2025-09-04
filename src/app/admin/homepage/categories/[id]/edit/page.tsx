
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
import { updateCategory } from "../../../actions"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/ImageUpload"
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { HomepageCategory } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  href: z.string().min(1, { message: "Link is required." }),
  imgSrc: z.string().min(1, { message: "An image is required." }),
  dataAiHint: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export default function EditHomepageCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [category, setCategory] = useState<HomepageCategory | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
        name: '',
        href: '',
        imgSrc: '',
        dataAiHint: '',
    },
  });

  useEffect(() => {
    async function loadCategory() {
      setLoading(true);
      // You'll need to implement this function or import it
      // const fetchedCategory = await getHomepageCategoryById(params.id);
      // if (fetchedCategory) {
      //   setCategory(fetchedCategory);
      //   form.reset(fetchedCategory);
      // } else {
      //   toast({ title: "Error", description: "Category not found.", variant: "destructive" });
      //   router.push('/admin/homepage');
      // }
      setLoading(false);
    }
    loadCategory();
  }, [params.id, router, form]);

  async function onSubmit(data: CategoryFormValues) {
    if (!category) return;
    const result = await updateCategory(category.id, data);

    if (result.success) {
        toast({
            title: "Category Updated",
            description: "The category has been updated successfully.",
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
  
  if (loading || !category) {
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
            <h1 className="text-3xl font-bold">Edit Featured Category</h1>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Category Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                       <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Smartphone" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="href"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. /category/smartphones" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                         <FormField
                            control={form.control}
                            name="imgSrc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image</FormLabel>
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
                            name="dataAiHint"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image AI Hint</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. smartphone sale" {...field} />
                                </FormControl>
                                <FormDescription>Optional hint for AI image generation services.</FormDescription>
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
