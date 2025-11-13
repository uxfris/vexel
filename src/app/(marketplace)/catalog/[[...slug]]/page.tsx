import Header from "../../_components/header";
import { getPlugins } from "@/lib/db/getPlugins";
import {
  normalizePricing,
  normalizeSort,
  normalizeSubcategories,
} from "@/lib/utils/normalizeFilters";
import PluginGrid from "../../_components/plugin-grid";

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
          slug ? (category?.name ?? "Explore Plugins") : "Explore Plugins"
        }
        subcategories={category?.subcategories ?? []}
        activeSubcategories={subcategories}
      />
      <PluginGrid
        initialPlugins={plugins}
        slug={slugValue}
        pricing={pricing}
        sort={sort}
        subcategories={subcategories}
      />
    </>
  );
}
