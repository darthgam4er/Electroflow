import { getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `${categoryName} - ElectroFlow`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const products = getProductsByCategory(params.slug);

  if (products.length === 0) {
    notFound();
  }
  
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-headline">{categoryName}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
