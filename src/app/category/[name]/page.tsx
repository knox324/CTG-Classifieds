"use client";

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { getAdsByCategory, getCategoryByName } from '@/lib/data';
import { AdCard } from '@/components/AdCard';
import { ArrowLeft, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AdWithSeller } from '@/lib/types';


export default function CategoryPage({ params }: { params: { name: string } }) {
  const categoryName = decodeURIComponent(params.name);
  // Initial data fetching can still be done like this.
  // The sorting will happen on the client side.
  const initialAds = getAdsByCategory(categoryName);
  const category = getCategoryByName(categoryName);
  
  const [sortOption, setSortOption] = useState('default');

  const sortedAds = useMemo(() => {
    let sorted: AdWithSeller[] = [...initialAds];
    switch (sortOption) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'rating_desc':
        sorted.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
      default:
        // No sorting or based on initial order
        break;
    }
    return sorted;
  }, [initialAds, sortOption]);


  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
            <div>
                <Button asChild variant="ghost" className="-ml-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    {categoryName}
                </h1>
            </div>
            <div className="w-48">
                 <Select onValueChange={setSortOption} defaultValue="default">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Default Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default Filter</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="rating_desc">Best Rating</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

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

      {sortedAds.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {sortedAds.map(ad => (
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
