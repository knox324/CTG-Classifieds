"use client";

import { useState, useEffect } from "react";
import { Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const colors = [
  { name: "Green", primary: { h: 158, s: 64, l: 47 }, accent: { h: 78, s: 86, l: 62 } },
  { name: "Blue", primary: { h: 197, s: 71, l: 53 }, accent: { h: 120, s: 73, l: 75 } },
  { name: "Rose", primary: { h: 346.8, s: 77.2, l: 49.8 }, accent: { h: 280, s: 80, l: 80 } },
  { name: "Orange", primary: { h: 24.6, s: 95, l: 53.1 }, accent: { h: 40, s: 90, l: 80 } },
  { name: "Violet", primary: { h: 262.1, s: 83.3, l: 57.8 }, accent: { h: 300, s: 80, l: 85 } },
];

export function ThemeColorPicker() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColorChange = (primary: {h:number, s:number, l:number}, accent: {h:number, s:number, l:number}) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", `${primary.h} ${primary.s}% ${primary.l}%`);
    root.style.setProperty("--accent", `${accent.h} ${accent.s}% ${accent.l}%`);
  };
  
  if (!mounted) {
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
                style={{ backgroundColor: `hsl(${color.primary.h}, ${color.primary.s}%, ${color.primary.l}%)` }}
              />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
