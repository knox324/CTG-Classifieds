import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAdById, getSellerById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

export default function AdPage({ params }: { params: { id: string } }) {
  const ad = getAdById(params.id);
  if (!ad) {
    notFound();
  }

  const seller = getSellerById(ad.sellerId);
  if (!seller) {
    notFound();
  }

  const whatsappLink = `https://wa.me/${seller.whatsapp.replace(/\D/g, '')}?text=I'm interested in your ad for "${ad.title}" on CTG Classifieds.`;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <Card className="overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-xl">
            <div className="relative aspect-[16/10]">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                fill
                className="object-cover"
                data-ai-hint="product image"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">{ad.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary mb-4">
                ৳{ad.price.toLocaleString('en-IN')}
              </p>
              <Separator className="my-4" />
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{ad.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-xl">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/seller/${seller.id}`} className="flex items-center gap-4 group mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint="person" />
                  <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{seller.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {seller.location}
                  </p>
                </div>
              </Link>
              <Separator />
              <div className="space-y-3 mt-4 text-sm">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>{seller.whatsapp}</span>
                </a>
                <a href={`tel:${seller.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>{seller.phone}</span>
                </a>
                <a href={`mailto:${seller.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>{seller.email}</span>
                </a>
              </div>
            </CardContent>
          </Card>
          <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" /> Contact on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
