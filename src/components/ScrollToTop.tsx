
"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="icon"
        onClick={scrollToTop}
        className={cn(
            "rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:bg-primary/90 hover:scale-110",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
        )}
      >
        <ChevronUp className="h-6 w-6" />
        <span className="sr-only">Go to top</span>
      </Button>
    </div>
  );
}
