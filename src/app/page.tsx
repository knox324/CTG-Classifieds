
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AdCard } from '@/components/AdCard';
import { getAds, categories as dataCategories } from '@/lib/data';
import type { AdWithSeller } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, UserCheck, Star, Baby, User, UserRound, ShoppingBasket, Sofa, Apple, GlassWater, Plane, Bus, Car, Bike } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

const categoryIcons: { [key: string]: React.ElementType } = {
    "Kid's Corner": Baby,
    "Men's Corner": User,
    "Female's Corner": UserRound,
    "Grocery Corner": ShoppingBasket,
    "Furniture's Corner": Sofa,
    "Fruit's Corner": Apple,
    "Beveridge Corner": GlassWater,
};

export default function Home() {
  const ads: AdWithSeller[] = getAds();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [marketingCarouselApi, setMarketingCarouselApi] = useState<CarouselApi | null>(null);

  const stats = [
    { icon: Box, value: "1,200+", label: "Active Ads" },
    { icon: UserCheck, value: "500+", label: "Verified Sellers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  const categories = dataCategories.map(c => ({
      name: c.name,
      icon: categoryIcons[c.name] || Box,
      href: `/category/${encodeURIComponent(c.name)}`,
  }));
  
  const deliveryMethods = [
    { name: "Air Cargo", icon: Plane },
    { name: "Bus Parcel", icon: Bus },
    { name: "Courier Van", icon: Car },
    { name: "Local Delivery", icon: Bike },
  ];

  const locations = ["Agrabad", "Nasirabad", "Pahartali", "Khatunganj", "Sitakunda", "Mirsharai", "Fatikchhari"];
  
  const featuredAds = [
    { src: 'https://picsum.photos/seed/mainbanner/800/450', alt: 'Main Banner', hint: 'electronics deal' },
    { src: 'https://picsum.photos/seed/sidebanner1/400/533', alt: 'Side Banner 1', hint: 'fashion sale' },
    { src: 'https://picsum.photos/seed/sidebanner2/400/533', alt: 'Side Banner 2', hint: 'new product' },
    { src: 'https://picsum.photos/seed/banner4/800/450', alt: 'Marketing Banner 4', hint: 'holiday discount' },
    { src: 'https://picsum.photos/seed/banner5/800/450', alt: 'Marketing Banner 5', hint: 'clearance sale' },
  ];
  
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSelect = useCallback(() => {
    if (carouselApi) {
      setActiveIndex(carouselApi.selectedScrollSnap());
    }
  }, [carouselApi]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', handleSelect);
      handleSelect();
      return () => {
        carouselApi.off('select', handleSelect);
      };
    }
  }, [carouselApi, handleSelect]);


  return (
    <>
      <section className="bg-gradient-to-br from-primary to-green-600 text-white relative pb-16">
        <div className="container mx-auto px-4 pt-16 md:pt-20 pb-12 text-center">
            <h1 className="text-5xl md:text-8xl font-extrabold leading-tight">
                Connect <br className="md:hidden" />
                <span className="text-yellow-300">Chattogram</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
                Your trusted marketplace connecting all upazilas of Chattogram District. From Agrabad to Sitakunda - discover, buy, and sell locally.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="sm" className="bg-white text-primary hover:bg-gray-200 rounded-full w-full sm:w-auto" asChild>
                    <Link href="#all-products">
                        Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white rounded-full w-full sm:w-auto" asChild>
                    <Link href="/about">
                        About Us
                    </Link>
                </Button>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 bg-background" style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}></div>
      </section>

      <div className="relative -mt-24 md:-mt-28">
          <div className="container mx-auto px-4">
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-full p-3 flex justify-around items-center shadow-lg max-w-sm md:max-w-3xl mx-auto">
                  {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center gap-2 text-center animate-in fade-in-0 slide-in-from-bottom-10 duration-500 ease-out"
                        style={{ animationFillMode: 'backwards', animationDelay: `${index * 150}ms` }}
                      >
                          <stat.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                          <div>
                              <p className="text-sm md:text-xl font-bold text-foreground">{stat.value}</p>
                              <p className="text-xs text-foreground/80">{stat.label}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <section id="categories" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Browse by Category</h2>
          <div className="flex gap-4 pb-4 overflow-x-auto md:justify-center md:flex-wrap no-scrollbar">
              {categories.map((category, index) => (
                <div
                  key={`${category.name}-${index}`}
                  className="animate-in fade-in zoom-in-95 duration-500 ease-out"
                  style={{ animationFillMode: 'backwards', animationDelay: `${index * 100}ms` }}
                >
                  <Link href={category.href} className="flex-shrink-0">
                    <Card className="flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-primary/10 w-32 h-32 md:w-36 md:h-36">
                      <category.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2" />
                      <span className="font-semibold text-center text-xs md:text-sm">{category.name}</span>
                    </Card>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="featured-ads" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12 text-center text-primary">Featured Ads</h2>
            <Carousel
                setApi={setCarouselApi}
                opts={{
                    align: "center",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {featuredAds.map((ad, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="overflow-hidden transition-all duration-500 ease-in-out rounded-xl">
                                    <div 
                                        className={`relative aspect-video transition-all duration-500 ease-in-out rounded-xl
                                        ${
                                          activeIndex === index
                                            ? 'md:scale-125 shadow-[0_0_35px_8px] shadow-primary/50'
                                            : 'md:scale-90 opacity-70'
                                        }`}
                                        >
                                        <Image
                                            src={ad.src}
                                            alt={ad.alt}
                                            fill
                                            className="object-cover rounded-xl"
                                            data-ai-hint={ad.hint}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex"/>
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        </div>
      </section>

      <section id="all-products" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Explore All Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {ads.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </section>
      
       <section className="relative py-24 bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/delivery-bg/1920/1080"
            alt="Logistics background"
            fill
            className="object-cover opacity-10"
            data-ai-hint="logistics delivery"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
            Delivering products wholesale, anywhere you are
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            From the bustling city to the quiet countryside, we connect Chattogram's businesses to the entire nation.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {deliveryMethods.map((method, index) => (
              <div 
                key={method.name} 
                className="flex flex-col items-center gap-3 animate-in fade-in-0 slide-in-from-bottom-10 duration-500 ease-out"
                style={{ animationFillMode: 'backwards', animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-background/70 backdrop-blur-sm rounded-full p-4 md:p-5 border shadow-lg">
                  <method.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <h3 className="text-md md:text-lg font-semibold">{method.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

       <div className="bg-secondary/50 py-4">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-muted-foreground text-xs md:text-sm">
            <span className="font-semibold text-foreground">Serving:</span>
            <div className="flex flex-wrap items-center justify-center">
              {locations.map((loc, i) => (
                <React.Fragment key={loc}>
                  <span>{loc}</span>
                  {i < locations.length - 1 && <span className="mx-1.5 text-gray-400">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}
