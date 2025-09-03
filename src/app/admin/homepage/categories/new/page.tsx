
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
import { addHomepageCategory } from "../actions"
import { useRouter } from "next/navigation"

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  href: z.string().min(1, { message: "Link is required." }),
  imgSrc: z.string().url({ message: "Please enter a valid URL." }),
  dataAiHint: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export default function NewHomepageCategoryPage() {
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
        name: '',
        href: '',
        imgSrc: '',
        dataAiHint: '',
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    const result = await addHomepageCategory(data);

    if (result.success) {
        toast({
            title: "Category Added",
            description: "The new category has been added successfully.",
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

  return (
    <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Add Featured Category</h1>
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
                                 <FormDescription>Enter a relative path or a full URL.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="imgSrc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://picsum.photos/seed/new-category/100/100" {...field} />
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
                    <Button type="submit">Save Category</Button>
                </div>
            </form>
        </Form>
    </div>
  )
}
