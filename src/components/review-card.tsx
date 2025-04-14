"use client";

import React, { useState, useTransition } from "react";
import { useMutation, useQuery } from "convex/react";
import { MessageSquareIcon } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Button } from "./_ui/button";
import { Textarea } from "./_ui/textarea";
import { StarRating } from "./star-rating";
import { StarRatingDisplay } from "./star-rating-display";

interface ReviewFormState {
  rating: number | null;
  review: string;
}

type FormFields = ReviewFormState;
type FormValue<T extends keyof FormFields> = FormFields[T];

interface ReviewCardProps {
  albumId: string;
}

export function ReviewCard({ albumId }: ReviewCardProps) {
  const [formState, setFormState] = useState<ReviewFormState>({ rating: null, review: "" });
  const submitReview = useMutation(api.review.createReview);
  const [isPending, startTransition] = useTransition();
  const review = useQuery(api.review.hasUserReviewedAlbum, { albumId, userId: "test" });

  async function handleSubmit(e: React.FormEvent) {
    const { rating } = formState;

    e.preventDefault();
    if (!rating) return;

    startTransition(async () => {
      try {
        await submitReview({ albumId, rating, text: formState.review, userId: "test" });
        setFormState({ rating: null, review: "" });
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    });
  }

  function updateFormState<T extends keyof FormFields>(field: T, value: FormValue<T>): void {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }

  if (review) {
    return (
      <div className="h-fit w-lg rounded-lg border p-6">
        <h3 className="mb-4 text-xl font-bold">You&apos;ve already rated this album!</h3>
        <div className="text-muted-foreground flex items-center gap-3">
          <StarRatingDisplay rating={review.rating} sizeClassName="size-4" />
          <span className="text-primary font-medium">{review.rating}</span>
        </div>
        <p className="text-muted-foreground">
          You can only rate an album once. If you want to rate this album again, please remove your previous rating.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-fit w-lg rounded-lg border p-6">
      <h3 className="mb-4 text-xl font-bold">Rate this Album</h3>
      <StarRating value={formState.rating} onChange={(rating) => updateFormState("rating", rating)} />
      <div className="my-4 h-px" />
      <div className="space-y-4">
        <h4 className="font-medium">Write a Review</h4>
        <Textarea
          placeholder="Share your thoughts on this album..."
          rows={4}
          value={formState.review}
          onChange={(e) => updateFormState("review", e.target.value)}
        />
        <Button className="w-full" type="submit" disabled={!formState.rating || isPending}>
          <MessageSquareIcon className="mr-2 h-4 w-4" />
          {isPending ? "Posting..." : "Post Review"}
        </Button>
      </div>
    </form>
  );
}
