
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DollarSign, CreditCard, Package } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentSales = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '1,999.00' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '39.00' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '299.00' },
    { name: 'William Kim', email: 'will@email.com', amount: '99.00' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '39.00' },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSales.map((sale) => (
                        <TableRow key={sale.email}>
                            <TableCell>
                                <div className="font-medium">{sale.name}</div>
                                <div className="text-sm text-muted-foreground">{sale.email}</div>
                            </TableCell>
                            <TableCell className="text-right">${sale.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105">
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
            <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105">
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
    </div>
  );
}
