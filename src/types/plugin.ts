import { Plugin, Seller } from "@/lib/prisma/client";

export type PluginWithSeller = Pick<
  Plugin,
  | "id"
  | "title"
  | "slug"
  | "description"
  | "thumbnailUrl"
  | "demoGifUrl"
  | "price"
  | "discountPrice"
> & {
  seller: Pick<Seller, "name" | "slug">;
};
