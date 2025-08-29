import { notFound } from 'next/navigation';
import { getSellerById, getAdsBySellerId } from '@/lib/data';
import { AdCard } from '@/components/AdCard';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, MapPin, Phone, MessageCircle, Star } from 'lucide-react';

export default function SellerPage({ params }: { params: { id: string } }) {
  const seller = getSellerById(params.id);
  if (!seller) {
    notFound();
  }

  const ads = getAdsBySellerId(seller.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-8 bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint="person" />
            <AvatarFallback className="text-4xl">{seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <h1 className="text-4xl font-headline font-bold">{seller.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{seller.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{seller.rating}</span>
                <span>({seller.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2 flex-wrap">
              <a href={`https://wa.me/${seller.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>{seller.whatsapp}</span>
              </a>
              <a href={`tel:${seller.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
                <Phone className="h-4 w-4" />
                <span>{seller.phone}</span>
              </a>
              <a href={`mailto:${seller.email}`} className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
                <Mail className="h-4 w-4" />
                <span>{seller.email}</span>
              </a>
            </div>
          </div>
        </div>
      </Card>
      
      <h2 className="text-3xl font-headline font-bold mb-6">Listings from {seller.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {ads.length > 0 ? (
          ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
        ) : (
          <p className="text-muted-foreground col-span-full">This seller has no active listings.</p>
        )}
      </div>
    </div>
  );
}
