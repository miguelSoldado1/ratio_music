"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AlbumReviewItem } from "./album-review-item";

interface AlbumReviewsProps {
  albumId: string;
}

export function AlbumReviews({ albumId }: AlbumReviewsProps) {
  const data = useQuery(api.review.getReviewsByAlbumId, { albumId, userId: "test" });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <ol className="divide-y">
      {data.map((review) => (
        <AlbumReviewItem key={review._id} user={{ username: "miguel", avatar: "" }} {...{ ...review, comments: 0 }} />
      ))}
    </ol>
  );
}
