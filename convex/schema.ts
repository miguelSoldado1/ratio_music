import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  review: defineTable({
    rating: v.number(),
    text: v.optional(v.string()),
    albumId: v.string(),
    userId: v.string(),
  }),
  like: defineTable({
    reviewId: v.id("review"),
    userId: v.string(),
  }).index("by_review_user", ["reviewId", "userId"]),
});
