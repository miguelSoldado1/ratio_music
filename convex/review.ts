import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllReviews = query({
  handler: async (ctx) => {
    const reviews = await ctx.db.query("review").order("desc").collect();

    const reviewWithLikes = await Promise.all(
      reviews.map(async (review) => {
        const likes = await ctx.db
          .query("like")
          .withIndex("by_review_user")
          .filter((q) => q.eq(q.field("reviewId"), review._id))
          .collect();

        // Get current user's like status
        const hasLiked = likes.some((like) => like.userId === "test");

        return {
          ...review,
          likes: likes.length,
          hasLiked,
        };
      }),
    );

    return reviewWithLikes;
  },
});

export const getReviewsByAlbumId = query({
  args: { albumId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("review")
      .filter((q) => q.eq(q.field("albumId"), args.albumId))
      .order("desc")
      .collect();

    const reviewWithLikes = await Promise.all(
      reviews.map(async (review) => {
        const likes = await ctx.db
          .query("like")
          .withIndex("by_review_user")
          .filter((q) => q.eq(q.field("reviewId"), review._id))
          .collect();

        // Get current user's like status
        const hasLiked = args.userId ? likes.some((like) => like.userId === args.userId) : false;

        return {
          ...review,
          likes: likes.length,
          hasLiked,
        };
      }),
    );

    return reviewWithLikes;
  },
});

export const hasUserReviewedAlbum = query({
  args: { albumId: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const existingReview = await ctx.db
      .query("review")
      .filter((q) => q.and(q.eq(q.field("albumId"), args.albumId), q.eq(q.field("userId"), args.userId)))
      .first();

    return existingReview;
  },
});

export const createReview = mutation({
  args: {
    rating: v.number(),
    albumId: v.string(),
    userId: v.string(),
    text: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("review", {
      rating: args.rating,
      text: args.text,
      albumId: args.albumId,
      userId: args.userId,
    });
  },
});
