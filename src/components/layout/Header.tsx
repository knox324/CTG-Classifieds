import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Globe, Plus, UserCircle, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ThemeColorPicker } from "../ThemeColorPicker";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg shadow-lg rounded-b-[2.5rem]">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <div className="bg-primary text-primary-foreground rounded-full h-9 w-9 flex items-center justify-center font-bold text-xl">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              ChattogramAds
            </span>
            <p className="text-xs text-muted-foreground -mt-1">
              Premium Classifieds
            </p>
          </div>
        </Link>
        
        <div className="flex-1 max-w-md ml-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search products, services..." 
                    className="w-full rounded-full bg-secondary border-transparent pl-11 text-base h-12 focus:bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" className="hidden md:flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <MapPin className="h-5 w-5" />
                Chattogram
            </Button>
            <ThemeColorPicker />
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5 text-base h-11">
              <Link href="/post-ad">
                <Plus className="mr-1.5 h-5 w-5" /> Post Ad
              </Link>
            </Button>
             <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-7 w-7" />
            </Button>
        </div>
      </div>
    </header>
  );
}
