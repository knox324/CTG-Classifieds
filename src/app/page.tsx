
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AdCard } from '@/components/AdCard';
import { getAds } from '@/lib/data';
import type { Ad } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, UserCheck, Star, Baby, User, UserRound, ShoppingBasket, Sofa, Apple, GlassWater, Plane, Bus, Car, Bike } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

export default function Home() {
  const ads: Ad[] = getAds();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  const stats = [
    { icon: Box, value: "1,200+", label: "Active Ads" },
    { icon: UserCheck, value: "500+", label: "Verified Sellers" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  const categories = [
    { name: "Kid's Corner", icon: Baby, href: "#" },
    { name: "Men's Corner", icon: User, href: "#" },
    { name: "Female's Corner", icon: UserRound, href: "#" },
    { name: "Grocery Corner", icon: ShoppingBasket, href: "#" },
    { name: "Furniture's Corner", icon: Sofa, href: "#" },
    { name: "Fruit's Corner", icon: Apple, href: "#" },
    { name: "Beverage Corner", icon: GlassWater, href: "#" },
  ];
  
  const deliveryMethods = [
    { name: "Air Cargo", icon: Plane },
    { name: "Bus Parcel", icon: Bus },
    { name: "Courier Van", icon: Car },
    { name: "Local Delivery", icon: Bike },
  ];

  const locations = ["Agrabad", "Nasirabad", "Pahartali", "Khatunganj", "Sitakunda", "Mirsharai", "Fatikchhari"];
  
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
                    <Link href="#featured">
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

      <div id="featured" className="container mx-auto px-4 pb-24">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Featured Listings</h2>
        
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {ads.map((ad, index) => (
              <CarouselItem key={ad.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 group">
                 <div className="p-1">
                   <div className="transition-all duration-300 ease-in-out" style={{
                      transform: activeIndex === index ? 'scale(1.2)' : 'scale(0.6)',
                      opacity: activeIndex === index ? 1 : 0.5,
                      filter: activeIndex === index ? 'blur(0)' : 'blur(2px)',
                    }}>
                    <AdCard ad={ad} />
                   </div>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex"/>
          <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </div>

      <section id="all-products" className="container mx-auto px-4 pb-24">
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

    