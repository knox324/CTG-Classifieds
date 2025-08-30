
import Link from 'next/link';
import Image from 'next/image';
import type { Ad } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ad/${ad.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-white/50 dark:hover:bg-black/50">
        <div className="relative aspect-[4/3]">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
        <CardContent className="p-4 space-y-2">
          <Badge variant="secondary" className="capitalize text-xs">{ad.category}</Badge>
          <h3 className="text-lg font-headline font-semibold truncate pt-1">{ad.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">
              ৳{ad.price.toLocaleString('en-IN')}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
