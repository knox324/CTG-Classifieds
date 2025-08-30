
import { notFound } from 'next/navigation';
import { getAdsByCategory } from '@/lib/data';
import { AdCard } from '@/components/AdCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CategoryPage({ params }: { params: { name: string } }) {
  const categoryName = decodeURIComponent(params.name);
  const ads = getAdsByCategory(categoryName);

  if (ads.length === 0) {
    // Or you could show a "No products found in this category" message
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" size="icon" className="mr-2">
            <Link href="/">
                <ArrowLeft />
            </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
            {categoryName}
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {ads.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
