import Link from "next/link";
import { MountainIcon } from "lucide-react";
import { ThemeColorPicker } from "@/components/ThemeColorPicker";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            CTG Classifieds
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Browse
          </Link>
          <Link
            href="/post-ad"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Post Ad
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <ThemeColorPicker />
        </div>
      </div>
    </header>
  );
}
