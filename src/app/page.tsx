import { AdCard } from '@/components/AdCard';
import { getAds } from '@/lib/data';
import type { Ad } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
  const ads: Ad[] = getAds();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Featured Listings</h1>
        <Button asChild>
          <Link href="/post-ad">
            <Plus className="mr-2 h-4 w-4" /> Post an Ad
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
