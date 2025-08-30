
import Link from 'next/link';
import Image from 'next/image';
import type { AdWithSeller } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Star } from 'lucide-react';

interface AdCardProps {
  ad: AdWithSeller;
}

export function AdCard({ ad }: AdCardProps) {
  const shortDescription = ad.description.split('.').slice(0, 1).join('.') + '.';

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl group flex flex-col h-full">
      <Link href={`/ad/${ad.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
          <Badge variant="secondary" className="absolute top-3 right-3 capitalize text-xs bg-black/50 text-white border-transparent">
            {ad.category}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4 space-y-3 flex-grow flex flex-col">
        <Link href={`/ad/${ad.id}`} className="block space-y-3">
          <h3 className="text-md font-headline font-semibold truncate">{ad.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-primary">
              ৳{ad.price.toLocaleString('en-IN')}
            </p>
            {ad.seller.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{ad.seller.rating}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed h-8 overflow-hidden">
            {shortDescription}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{ad.location}</span>
          </div>
        </Link>
        <div className="border-t pt-3 mt-auto flex items-center justify-between">
            <Link href={`/seller/${ad.seller.id}`} className="flex items-center gap-2 group/seller">
              <Avatar className="h-8 w-8">
                <AvatarImage src={ad.seller.avatarUrl} alt={ad.seller.name} data-ai-hint="person" />
                <AvatarFallback>{ad.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium group-hover/seller:text-primary transition-colors">{ad.seller.name}</span>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
