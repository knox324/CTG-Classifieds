
import { notFound } from 'next/navigation';
import { getAdsByCategory, getCategoryByName } from '@/lib/data';
import { AdCard } from '@/components/AdCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CategoryPage({ params }: { params: { name: string } }) {
  const categoryName = decodeURIComponent(params.name);
  const ads = getAdsByCategory(categoryName);
  const category = getCategoryByName(categoryName);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
            {categoryName}
        </h1>
        {category.subcategories && category.subcategories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {category.subcategories.map(sub => (
                    <Badge key={sub} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                        {sub}
                    </Badge>
                ))}
            </div>
        )}
      </div>

      {ads.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {ads.map(ad => (
            <AdCard key={ad.id} ad={ad} />
            ))}
        </div>
        ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">There are currently no products listed in the "{categoryName}" category.</p>
        </div>
      )}
    </div>
  );
}

