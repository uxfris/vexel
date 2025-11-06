import { User, Plugin, Order, Review, Payout } from "../lib/prisma/client";

export type { User, Plugin, Order, Review, Payout };

export type PluginWithCreator = Plugin & {
  creator: Pick<User, "id" | "name" | "avatar">;
};

export type OrderWithPlugin = Order & {
  plugin: Pick<Plugin, "id" | "title" | "thumbnailUrl">;
};

export type ReviewWithUser = Review & {
  user: Pick<User, "id" | "name" | "avatar">;
};

export interface CartItem {
  pluginId: string;
  title: string;
  price: number;
  thumbnailUrl: string;
  creatorName: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  aeVersion?: string;
  os?: string;
  sortBy?: "newest" | "popular" | "price-asc" | "price-desc" | "rating";
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
