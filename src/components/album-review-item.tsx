"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/avatar";
import { Button } from "@/components/_ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronUp, Heart, MessageCircle, Share2 } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { StarRatingDisplay } from "./star-rating-display";

function formatDate(isoString: number): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }

  // Default to formatted date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Different content length thresholds for mobile and desktop
const mobileThreshold = 100;
const desktopThreshold = 300;

interface AlbumReviewItemProps {
  user: {
    username: string;
    avatar: string;
  };
  _id: Id<"review">;
  rating: number;
  text?: string | undefined;
  likes: number;
  hasLiked: boolean;
  comments: number;
  _creationTime: number;
}

export function AlbumReviewItem({
  _id,
  user,
  rating,
  text,
  _creationTime,
  likes,
  comments,
  hasLiked,
}: AlbumReviewItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  const likeReview = useMutation(api.like.toggleLike);

  // Check if content exceeds thresholds
  const exceedsMobileThreshold = (text?.length ?? 0) > mobileThreshold;
  const exceedsDesktopThreshold = (text?.length ?? 0) > desktopThreshold;
  const exceedsThreshold = isMobile ? exceedsMobileThreshold : exceedsDesktopThreshold;

  async function handleLike() {
    await likeReview({ userId: "test", reviewId: _id });
  }

  return (
    <div className="py-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <Avatar className="border-muted-foreground size-8 border md:h-10 md:w-10">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-muted-foreground">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium md:text-base">{user.username}</div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>{formatDate(_creationTime)}</span>
              <StarRatingDisplay rating={rating} />
              <span className="text-primary font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "text-sm leading-relaxed transition-all duration-300",
          !expanded && exceedsThreshold && (isMobile ? "line-clamp-3" : "line-clamp-4"),
        )}
      >
        {text}
      </div>
      {exceedsThreshold && (
        <Button
          variant="ghost"
          size="sm"
          className="text-primary mt-1 flex items-center justify-center px-0"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-1 size-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 size-4" />
              See more
            </>
          )}
        </Button>
      )}
      <div className="text-muted-foreground mt-3 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-8 gap-1.5 px-2"
          onClick={handleLike}
        >
          <Heart className={cn("size-4", hasLiked ? "fill-primary text-primary" : "fill-transparent")} />
          <span>{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 gap-1.5 px-2">
          <MessageCircle className="size-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 px-2">
          <Share2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
