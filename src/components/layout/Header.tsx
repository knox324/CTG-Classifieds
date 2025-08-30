
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Plus, UserCircle, Bell, Loader2, Globe, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ThemeColorPicker } from "../ThemeColorPicker";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchResults } from './SearchResults';


export function Header() {
  const [location, setLocation] = useState("Chattogram");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Note: Geolocation is commented out as it requires a reverse geocoding API 
  // to turn coordinates into a location name, which is beyond the scope of this tool.
  useEffect(() => {
    setTimeout(() => {
        setLocation("Chattogram"); // Placeholder
        setIsLoadingLocation(false);
    }, 1500);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg shadow-sm">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-full h-9 w-9 flex items-center justify-center font-bold text-xl">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              ChattogramAds
            </span>
            <p className="text-xs text-muted-foreground -mt-1 hidden md:block">
              Premium Classifieds
            </p>
          </div>
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-md ml-auto">
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search products, services..." 
                    className="w-full rounded-full bg-secondary border-transparent pl-11 text-base h-12 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchQuery(searchQuery || '')}
                />
                {searchQuery && <SearchResults query={searchQuery} onResultClick={() => setSearchQuery('')} />}
            </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" className="hidden md:flex items-center gap-2">
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </span>
                    <MapPin className="h-5 w-5" />
                    {location}
                  </>
                )}
            </Button>
            <div id="google_translate_element" className="relative w-10 h-10 flex items-center justify-center">
                <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-foreground/80 pointer-events-none" />
            </div>
            <ThemeColorPicker />
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5 text-base h-11">
              <a href="https://wa.me/8801810074097?text=I'd like to post an ad on ChattogramAds" target="_blank" rel="noopener noreferrer">
                <Plus className="mr-1.5 h-5 w-5" /> Post Ad
              </a>
            </Button>
             <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-7 w-7" />
            </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden flex-1 justify-end">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col h-full p-4 space-y-6">
                        <div className="relative mt-8">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                type="search" 
                                placeholder="Search products..." 
                                className="w-full rounded-full bg-secondary border-transparent pl-11 text-base h-12 focus:bg-background"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                             {searchQuery && <SearchResults query={searchQuery} onResultClick={() => { setSearchQuery(''); closeSheet(); }} />}
                        </div>

                        <nav className="flex flex-col space-y-2">
                             <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5 text-base h-11 justify-start">
                              <a href="https://wa.me/8801810074097?text=I'd like to post an ad on ChattogramAds" target="_blank" rel="noopener noreferrer" onClick={closeSheet}>
                                <Plus className="mr-3 h-5 w-5" /> Post Ad
                              </a>
                            </Button>
                            <Button variant="ghost" className="justify-start gap-3">
                                <UserCircle className="h-6 w-6" />
                                <span>Profile</span>
                            </Button>
                            <Button variant="ghost" className="justify-start gap-3">
                                <Bell className="h-5 w-5" />
                                <span>Notifications</span>
                            </Button>
                        </nav>

                        <div className="mt-auto space-y-4">
                            <div className="flex items-center justify-between">
                               <span>Theme</span>
                               <div className='flex items-center'>
                                <ThemeColorPicker />
                                <ThemeToggle />
                               </div>
                            </div>
                            <Button variant="ghost" className="w-full flex items-center justify-start gap-2">
                                {isLoadingLocation ? (
                                  <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Loading Location...</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-5 w-5" />
                                    {location}
                                  </>
                                )}
                            </Button>
                             <div id="google_translate_element_mobile" className="flex items-center justify-start gap-2 text-sm font-medium h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                                <Globe className="h-5 w-5" />
                                <span>Translate</span>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
