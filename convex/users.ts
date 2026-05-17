import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const updateCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: identity.name,
        email: identity.email,
      });
      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name,
      email: identity.email,
      role: "admin", // first user is admin; can be changed
    });
    return userId;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
  },
});

export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
      v.literal("parent")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Not authenticated", code: "UNAUTHENTICATED" });

    const caller = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!caller || caller.role !== "admin") {
      throw new ConvexError({ message: "Only admins can change roles", code: "FORBIDDEN" });
    }

    await ctx.db.patch(args.userId, { role: args.role });
  },
});

export const listByRole = query({
  args: {
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
      v.literal("parent")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Not authenticated", code: "UNAUTHENTICATED" });

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new ConvexError({ message: "User not found", code: "NOT_FOUND" });

    await ctx.db.patch(user._id, {
      ...(args.name !== undefined && { name: args.name }),
      ...(args.phone !== undefined && { phone: args.phone }),
      ...(args.avatar !== undefined && { avatar: args.avatar }),
    });
  },
});