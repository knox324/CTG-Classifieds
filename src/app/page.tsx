
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AdCard } from '@/components/AdCard';
import { getAds } from '@/lib/data';
import type { Ad } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, UserCheck, Star, Baby, User, UserRound, ShoppingBasket, Sofa, Apple, Utensils, GlassWater, Plane, Bus, Car, Bike } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const ads: Ad[] = getAds();

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
    { name: "Cook's Corner", icon: Utensils, href: "#" },
    { name: "Beverage Corner", icon: GlassWater, href: "#" },
    { name: "Kid's Corner", icon: Baby, href: "#" },
    { name: "Men's Corner", icon: User, href: "#" },
    { name: "Female's Corner", icon: UserRound, href: "#" },
    { name: "Grocery Corner", icon: ShoppingBasket, href: "#" },
  ];
  
  const deliveryMethods = [
    { name: "Air Cargo", icon: Plane },
    { name: "Bus Parcel", icon: Bus },
    { name: "Courier Van", icon: Car },
    { name: "Local Delivery", icon: Bike },
  ];

  const locations = ["Agrabad", "Nasirabad", "Pahartali", "Khatunganj", "Sitakunda", "Mirsharai", "Fatikchhari"];

  const categoriesSectionRef = useRef<HTMLDivElement>(null);
  const categoriesContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesSectionRef.current && categoriesContentRef.current) {
        const section = categoriesSectionRef.current;
        const rect = section.getBoundingClientRect();
        const { top, height } = rect;
        const windowHeight = window.innerHeight;

        if (top < windowHeight && top + height > 0) {
          const scrollableWidth = categoriesContentRef.current.scrollWidth - categoriesContentRef.current.clientWidth;
          const scrollProgress = (windowHeight - top) / (windowHeight + height);
          const newScrollX = Math.max(0, Math.min(scrollableWidth, scrollProgress * scrollableWidth * 1.5));
          categoriesContentRef.current.scrollLeft = newScrollX;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary to-green-600 text-white relative pb-16">
        <div className="container mx-auto px-4 pt-20 pb-12 text-center">
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
                    <Link href="/about">
                        About Us
                    </Link>
                </Button>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-background" style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}></div>
      </section>

      <div className="relative -mt-28">
          <div className="container mx-auto px-4">
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 rounded-full p-3 flex justify-around items-center shadow-lg max-w-3xl mx-auto">
                  {stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-2 text-center md:text-left">
                          <stat.icon className="h-7 w-7 text-primary" />
                          <div className='hidden md:block'>
                              <p className="text-xl font-bold text-foreground">{stat.value}</p>
                              <p className="text-xs text-foreground/80">{stat.label}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <section id="categories" ref={categoriesSectionRef} className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-headline font-bold mb-8 text-center">Browse by Category</h2>
          <div ref={categoriesContentRef} className="flex gap-4 pb-4 overflow-x-auto">
              {categories.map((category, index) => (
                <Link key={`${category.name}-${index}`} href={category.href} className="flex-shrink-0">
                  <Card className="flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-primary/10 w-36 h-36">
                    <category.icon className="h-10 w-10 text-primary mb-2" />
                    <span className="font-semibold text-center text-sm">{category.name}</span>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <div id="featured" className="container mx-auto px-4 pb-24">
        <h2 className="text-4xl font-headline font-bold mb-8 text-center">Featured Listings</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
      
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
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Delivering products wholesale, anywhere you are
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            From the bustling city to the quiet countryside, we connect Chattogram's businesses to the entire nation.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {deliveryMethods.map((method, index) => (
              <div 
                key={method.name} 
                className="flex flex-col items-center gap-3 transition-all duration-500 ease-out [animation-timeline:view()] [animation-range:entry_25%_cover_50%] animate-in fade-in-0 slide-in-from-bottom-10"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-background/70 backdrop-blur-sm rounded-full p-5 border shadow-lg">
                  <method.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{method.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

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

    