import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const toggleLike = mutation({
  args: {
    userId: v.string(),
    reviewId: v.id("review"),
  },
  handler: async (ctx, args) => {
    const existingLike = await ctx.db
      .query("like")
      .withIndex("by_review_user", (q) => q.eq("reviewId", args.reviewId).eq("userId", args.userId))
      .first();

    if (existingLike) {
      return await ctx.db.delete(existingLike._id);
    }

    return await ctx.db.insert("like", args);
  },
});
