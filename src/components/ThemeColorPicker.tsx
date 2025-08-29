"use client";

import { useState, useEffect } from "react";
import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const colors = [
  { name: "Blue", primary: "hsl(197, 71%, 53%)", accent: "hsl(120, 73%, 75%)" },
  { name: "Rose", primary: "hsl(346.8, 77.2%, 49.8%)", accent: "hsl(280, 80%, 80%)" },
  { name: "Green", primary: "hsl(142.1, 76.2%, 36.3%)", accent: "hsl(100, 70%, 80%)" },
  { name: "Orange", primary: "hsl(24.6, 95%, 53.1%)", accent: "hsl(40, 90%, 80%)" },
  { name: "Violet", primary: "hsl(262.1, 83.3%, 57.8%)", accent: "hsl(300, 80%, 85%)" },
];

export function ThemeColorPicker() {
  const [mounted, setMounted] = useState(false);
  
  // To avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColorChange = (primary: string, accent: string) => {
    document.documentElement.style.setProperty("--primary", primary);
    document.documentElement.style.setProperty("--accent", accent);
  };
  
  if (!mounted) {
    // Return a placeholder or null to avoid rendering on the server
    return <div className="h-8 w-8" />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Change theme color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex gap-2">
          {colors.map((color) => (
            <Button
              key={color.name}
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleColorChange(color.primary, color.accent)}
              title={color.name}
            >
              <span
                className="h-full w-full rounded-full"
                style={{ backgroundColor: color.primary }}
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
