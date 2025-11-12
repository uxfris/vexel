import { prisma } from "@/lib/db/prisma";
import Header from "../../components/header";
import PluginCard from "../../components/pluginCard";
import { getPlugins } from "@/lib/db/getPlugins";
import {
  normalizePricing,
  normalizeSort,
  normalizeSubcategories,
} from "@/lib/utils/normalizeFilters";

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

  const pricing = normalizePricing(
    typeof resolveSearchParams.pricing === "string"
      ? resolveSearchParams.pricing
      : undefined
  );

  const sort = normalizeSort(
    typeof resolveSearchParams.sort === "string"
      ? resolveSearchParams.sort
      : undefined
  );

  const subcategories = normalizeSubcategories(
    resolveSearchParams.subcategories
  );

  const { category, plugins } = await getPlugins({
    slug: slugValue,
    pricing,
    sort,
    subcategories,
  });

  return (
    <>
      <Header
        category={
          slug ? (category?.name ?? "Explore Catalog") : "Explore Catalog"
        }
        subcategories={category?.subcategories ?? []}
        activeSubcategories={subcategories}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
        {plugins.map((plugin) => (
          <PluginCard
            key={plugin.id}
            plugin={plugin}
            category={category ?? plugin.category}
            seller={plugin.seller}
          />
        ))}
      </div>
    </>
  );
}
