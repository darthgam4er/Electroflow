
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or remove products from your store.</p>
            <Button asChild>
                <Link href="/admin/products">Go to Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="mb-4">Add, edit, or re-arrange product categories.</p>
            <Button asChild>
                <Link href="/admin/categories">Go to Categories</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Homepage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Change the hero images or promotional banners.</p>
            <Button asChild>
                <Link href="/admin/homepage">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
