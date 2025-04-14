"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type React from "react";

const MAX = 5;

interface AlbumRatingProps {
  value: number | null;
  onChange: (rating: number) => void;
}

export function StarRating({ value, onChange }: AlbumRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  function handleMouseMove(index: number, e: React.MouseEvent) {
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    setHover(index + (isHalf ? 0.5 : 1));
  }

  function handleClick(index: number, e: React.MouseEvent) {
    const { left, width } = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    const newRating = index + (isHalf ? 0.5 : 1);
    onChange(newRating);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: MAX }, (_, i) => (
            <div
              key={i}
              className="relative cursor-pointer"
              onMouseMove={(e) => handleMouseMove(i, e)}
              onMouseLeave={() => setHover(null)}
              onClick={(e) => handleClick(i, e)}
            >
              <Star
                className={`size-8 ${(hover ?? value ?? 0) >= i + 1 ? "fill-primary text-primary" : "text-muted-foreground"}`}
              />

              {(hover ?? value ?? 0) >= i + 0.5 && (hover ?? value ?? 0) < i + 1 && (
                <div className="pointer-events-none absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                  <Star className="fill-primary text-primary h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-primary text-3xl font-bold">{value ? value.toFixed(1) : "-"}</div>
      </div>
    </div>
  );
}
