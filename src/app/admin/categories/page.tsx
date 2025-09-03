
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  // Placeholder data - in a real app, you'd fetch this from your database
  const categories = [
    { id: 'laptops', name: 'Laptops', productCount: 5 },
    { id: 'smartphones', name: 'Smartphones', productCount: 8 },
    { id: 'audio', name: 'Audio', productCount: 12 },
    { id: 'tablets', name: 'Tablets', productCount: 3 },
    { id: 'wearables', name: 'Wearables', productCount: 7 },
    { id: 'appliances', name: 'Appliances', productCount: 15 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new">Add Category</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is where you would add, edit, or remove product categories for your store.
          </p>
          <div className="mt-4">
             {/* This is a placeholder for where the category list/table would go. */}
             <ul className="space-y-2">
                {categories.map(cat => (
                    <li key={cat.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                        <span>{cat.name}</span>
                        <span className="text-sm text-muted-foreground">{cat.productCount} products</span>
                    </li>
                ))}
             </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
