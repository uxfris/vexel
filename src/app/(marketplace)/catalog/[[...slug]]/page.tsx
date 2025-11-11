import { prisma } from "@/lib/db/prisma";
import Header from "../../components/header";
import PluginCard from "../../components/pluginCard";
import CatalogPluginList from "../../components/catalogPluginList";

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

  const category = await prisma.category.findFirst({
    where: { slug: slugValue },
  });

  const subCategories =
    typeof resolveSearchParams.subCategories === "string"
      ? resolveSearchParams.subCategories?.split(",")
      : [];
  return (
    <>
      <Header
        category={category?.name ?? "Explore Catalog"}
        activeSubCategories={subCategories}
      />
      <CatalogPluginList category={category!} />
    </>
  );
}
