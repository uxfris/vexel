import { Prisma } from "../prisma/client";
import { prisma } from "./prisma";

export async function getPlugins({
  slug,
  pricing,
  sort,
  subcategories,
}: {
  slug?: string;
  pricing?: "free" | "paid" | "paid_free";
  sort: "recent" | "popular";
  subcategories?: string[];
}) {
  const sortOptions: Record<string, Prisma.PluginOrderByWithRelationInput> = {
    popular: { downloadCount: "desc" },
    recent: { createdAt: "desc" },
  };
  const sortOption = sortOptions[sort] ?? sortOptions.recent;

  const priceFilter =
    pricing === "free"
      ? { price: 0 }
      : pricing === "paid"
        ? {
            price: { gt: 0 },
          }
        : {};

  if (slug === "featured") {
    const plugins = await prisma.plugin.findMany({
      where: { featured: true, ...priceFilter },
      include: {
        seller: { select: { name: true, slug: true } },
        category: true,
      },
      orderBy: sortOption,
    });
    return { category: null, plugins };
  }
  if (!slug) {
    const plugins = await prisma.plugin.findMany({
      where: {
        ...priceFilter,
        ...((subcategories?.length ?? 0 > 0)
          ? { subcategoryId: { in: subcategories } }
          : {}),
      },
      include: {
        seller: { select: { name: true, slug: true } },
        category: true,
      },
      orderBy: sortOption,
    });

    return { category: null, plugins };
  }

  const category = await prisma.category.findFirst({
    where: { slug },
    include: {
      subcategories: true,
      plugins: {
        where: {
          ...priceFilter,
          ...(subcategories?.length
            ? {
                subCategoryId: {
                  in: subcategories,
                },
              }
            : {}),
        },
        include: {
          seller: {
            select: {
              name: true,
              slug: true,
            },
          },
          category: true,
        },
        orderBy: sortOption,
      },
    },
  });
  return { category, plugins: category?.plugins ?? [] };
}
