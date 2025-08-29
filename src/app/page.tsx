import React from 'react';
import { AdCard } from '@/components/AdCard';
import { getAds } from '@/lib/data';
import type { Ad } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, UserCheck, Star } from 'lucide-react';

export default function Home() {
  const ads: Ad[] = getAds();

  const stats = [
    { icon: Box, value: "1,200+", label: "Active Ads" },
    { icon: UserCheck, value: "500+", label: "Verified Sellers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  const locations = ["Agrabad", "Nasirabad", "Pahartali", "Khatunganj", "Sitakunda", "Mirsharai", "Fatikchhari"];

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-green-600 text-white relative">
        <div className="container mx-auto px-4 pt-20 pb-28 text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">
                Connect <br className="md:hidden" />
                <span className="text-accent">Chattogram</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
                Your trusted marketplace connecting all upazilas of Chattogram District. From Agrabad to Sitakunda - discover, buy, and sell locally.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-full h-14 px-8 text-lg font-semibold" asChild>
                    <Link href="#featured">
                        Explore Marketplace <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:text-white rounded-full h-14 px-8 text-lg font-semibold" asChild>
                    <Link href="#how-it-works">
                        How It Works
                    </Link>
                </Button>
            </div>
        </div>

        <div className="relative -mb-12">
            <div className="container mx-auto px-4">
                <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-full p-3 flex justify-around items-center shadow-lg max-w-3xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2 text-center md:text-left">
                            <stat.icon className="h-7 w-7 text-accent" />
                            <div className='hidden md:block'>
                                <p className="text-xl font-bold">{stat.value}</p>
                                <p className="text-xs text-white/80">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-background" style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}></div>
      </section>

      <div id="featured" className="container mx-auto px-4 py-24 pt-32">
        <h2 className="text-4xl font-headline font-bold mb-8 text-center">Featured Listings</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>

       <div className="bg-secondary/50 py-4">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">Serving:</span>
            <div className="flex flex-wrap items-center justify-center">
              {locations.map((loc, i) => (
                <React.Fragment key={loc}>
                  <span>{loc}</span>
                  {i < locations.length - 1 && <span className="mx-2 text-gray-400">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}
