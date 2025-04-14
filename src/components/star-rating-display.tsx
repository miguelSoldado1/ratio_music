import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingDisplayProps {
  rating: number;
  sizeClassName?: string;
}

export function StarRatingDisplay({ rating, sizeClassName = "size-3" }: StarRatingDisplayProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="relative">
          <Star
            className={cn(sizeClassName, rating >= i + 1 ? "fill-primary text-primary" : "text-muted-foreground")}
          />
          {/* Half star overlay */}
          {rating >= i + 0.5 && rating < i + 1 && (
            <div className="pointer-events-none absolute top-0 left-0 h-full w-1/2 overflow-hidden">
              <Star className={cn("fill-primary text-primary", sizeClassName)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
