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
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-xl">
        <div className="relative aspect-video">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-headline font-semibold truncate">{ad.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-primary">
              ৳{ad.price.toLocaleString('en-IN')}
            </p>
            <Badge variant="secondary" className="capitalize">{ad.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
