// lib/queries/pluginQueryBuilder.ts
import { prisma } from "@/lib/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { serializePlugin } from "../utils/serializePlugin";

interface PluginQueryOptions {
  slug?: string;
  pricing?: "free" | "paid" | "paid_free";
  sort?: "popular" | "recent";
  subcategories?: string[];
  featured?: boolean;
  page?: number;
  limit?: number;
}

export async function getPlugins({
  slug,
  pricing = "paid_free",
  sort = "recent",
  subcategories = [],
  featured,
  page = 1,
  limit = 20,
}: PluginQueryOptions) {
  const where: any = {
    ...(pricing === "free"
      ? { price: 0 }
      : pricing === "paid"
        ? { price: { gt: 0 } }
        : {}),
    ...(subcategories.length > 0
      ? { subcategoryId: { in: subcategories } }
      : {}),
    ...(featured !== undefined ? { featured } : {}),
  };

  // If slug provided, fetch plugins from that category
  if (slug) {
    const category = await prisma.category.findFirst({
      where: { slug },
      include: {
        subcategories: true,
        plugins: {
          where,
          include: {
            category: true,
            seller: { select: { name: true, slug: true } },
          },
          orderBy:
            sort === "popular"
              ? { downloadCount: "desc" }
              : { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        },
      },
    });

    return {
      category,
      plugins: (category?.plugins ?? []).map(serializePlugin),
    };
  }

  // Otherwise, fetch all plugins
  const plugins = await prisma.plugin.findMany({
    where,
    include: {
      category: true,
      seller: { select: { name: true, slug: true } },
    },
    orderBy:
      sort === "popular" ? { downloadCount: "desc" } : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return { category: null, plugins: plugins.map(serializePlugin) };
}
