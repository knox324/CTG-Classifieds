import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Globe, Plus, UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-primary text-white shadow-md">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-8 flex flex-col items-start">
            <div className="flex items-center gap-2">
                <div className="bg-white text-primary rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">C</div>
                <span className="text-2xl font-bold tracking-tight">
                    ChattogramAds
                </span>
            </div>
            <p className="text-xs text-white/80 -mt-1 ml-10">Premium Classifieds</p>
        </Link>
        
        <div className="flex-1 max-w-xl">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    type="search" 
                    placeholder="Search products, services..." 
                    className="w-full rounded-full bg-white/20 border-white/30 placeholder:text-white/70 pl-10 text-base h-12 focus:bg-white/30 focus:ring-2 focus:ring-white"
                />
            </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" className="hidden md:flex gap-2 text-white hover:bg-white/20">
                <MapPin className="h-5 w-5" />
                Chattogram
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:bg-white/20">
                <Globe className="h-5 w-5" />
            </Button>
            <Button asChild className="bg-white text-primary hover:bg-gray-200 font-semibold rounded-full px-6 text-base h-11">
              <Link href="/post-ad">
                <Plus className="mr-2 h-5 w-5" /> Post Ad
              </Link>
            </Button>
             <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                <UserCircle className="h-7 w-7" />
            </Button>
        </div>
      </div>
    </header>
  );
}
