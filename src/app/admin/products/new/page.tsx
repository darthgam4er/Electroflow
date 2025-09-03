
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"
import { addProduct } from "../actions";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().positive(),
  category: z.string().min(1, { message: "Please select a category." }),
  images: z.array(z.object({ url: z.string().url({ message: "Please enter a valid URL." }) })).min(1, { message: "Please add at least one image." }),
  specs: z.array(z.object({ key: z.string().min(1), value: z.string().min(1) })),
  tag: z.enum(['Promo', 'Nouveau', '']),
  discount: z.coerce.number().min(0).max(1).optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function NewProductPage() {
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      images: [{ url: "" }],
      specs: [{ key: "", value: "" }],
      tag: '',
      discount: 0,
    },
  })

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control: form.control,
    name: "specs",
  });


  async function onSubmit(data: ProductFormValues) {
    const productData = {
        ...data,
        images: data.images.map(img => img.url),
        specs: data.specs.reduce((acc, spec) => {
            if(spec.key) acc[spec.key] = spec.value;
            return acc;
        }, {} as Record<string, string>),
        // Add a default empty reviews array for new products
        reviews: [],
    };

    const result = await addProduct(productData);

    if (result.success) {
        toast({
            title: "Product Added",
            description: "The new product has been saved successfully.",
        });
        router.push('/admin/products');
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
            <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. ASUS VIVOBOOK" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us a little bit about the product"
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Images</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {imageFields.map((field, index) => (
                                <FormField
                                key={field.id}
                                control={form.control}
                                name={`images.${index}.url`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={index !== 0 ? "sr-only" : ""}>Image URL</FormLabel>
                                        <div className="flex items-center gap-2">
                                            <FormControl>
                                                <Input placeholder="https://example.com/image.png" {...field} />
                                            </FormControl>
                                            <Button type="button" variant="outline" size="icon" onClick={() => removeImage(index)} disabled={imageFields.length <= 1}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            ))}
                             <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => appendImage({ url: "" })}
                            >
                                Add Image
                            </Button>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Specifications</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {specFields.map((field, index) => (
                                <div key={field.id} className="flex items-end gap-4">
                                     <FormField
                                        control={form.control}
                                        name={`specs.${index}.key`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormLabel className={index !== 0 ? "sr-only" : ""}>Spec Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. CPU" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name={`specs.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormLabel className={index !== 0 ? "sr-only" : ""}>Spec Value</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Quantum Fusion A1" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="button" variant="outline" size="icon" onClick={() => removeSpec(index)} disabled={specFields.length <= 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                             <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => appendSpec({ key: "", value: "" })}
                            >
                                Add Specification
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-8">
                     <Card>
                        <CardHeader><CardTitle>Pricing & Category</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Price (in DH)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="2699" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </Trigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="Laptops">Laptops</SelectItem>
                                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                                        <SelectItem value="Audio">Audio</SelectItem>
                                        <SelectItem value="Tablets">Tablets</SelectItem>
                                        <SelectItem value="Wearables">Wearables</SelectItem>
                                        <SelectItem value="Appliances">Appliances</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                             />
                        </CardContent>
                     </Card>

                     <Card>
                        <CardHeader><CardTitle>Tags & Discounts</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           <FormField
                                control={form.control}
                                name="tag"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a tag (optional)" />
                                        </Trigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="">None</SelectItem>
                                          <SelectItem value="Promo">Promo</SelectItem>
                                          <SelectItem value="Nouveau">Nouveau</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                             />
                              <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Discount Percentage</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 0.2 for 20%" {...field} step="0.01" />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a value between 0 (0%) and 1 (100%).
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                     </Card>
                </div>
            </div>
             <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
                <Button type="submit">Save Product</Button>
            </div>
            </form>
        </Form>
    </div>
  )
}
