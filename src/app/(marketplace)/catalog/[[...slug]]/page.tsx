import { prisma } from "@/lib/db/prisma";
import Header from "../../components/header";
import PluginCard from "../../components/pluginCard";

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolveSearchParams = await searchParams;
  const slugValue = slug?.[0];

  const sort =
    typeof resolveSearchParams.sort === "string"
      ? resolveSearchParams.sort
      : "recent";
  const pricing =
    typeof resolveSearchParams.pricing === "string"
      ? resolveSearchParams.pricing
      : "paid_free";
  const activeSubcategories =
    typeof resolveSearchParams.subcategories === "string"
      ? resolveSearchParams.subcategories.split(",")
      : [];

  const category = await prisma.category.findFirst({
    where: { slug: slugValue },
    include: {
      subcategories: true,
      plugins: {
        where: {
          ...(pricing === "free"
            ? { price: 0 }
            : pricing === "paid"
              ? { price: { gt: 0 } }
              : {}),
          ...(activeSubcategories.length > 0
            ? { subcategoryId: { in: activeSubcategories } }
            : {}),
        },
        include: { seller: { select: { name: true, slug: true } } },
        orderBy:
          sort === "popular"
            ? { downloadCount: "desc" }
            : { createdAt: "desc" },
      },
    },
  });

  return (
    <>
      <Header
        category={
          slug ? (category?.name ?? "Explore Catalog") : "Explore Catalog"
        }
        subcategories={category?.subcategories ?? []}
        activeSubcategories={activeSubcategories}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
        {category?.plugins.map((plugin) => (
          <PluginCard
            key={plugin.id}
            plugin={plugin}
            category={category}
            seller={plugin.seller}
          />
        ))}
      </div>
    </>
  );
}
