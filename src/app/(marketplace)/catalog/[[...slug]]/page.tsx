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

  const category = await prisma.category.findFirst({
    where: { slug: slugValue },
    include: {
      plugins: {
        include: { seller: { select: { name: true, slug: true } } },
      },
    },
  });

  const subCategories =
    typeof resolveSearchParams.subCategories === "string"
      ? resolveSearchParams.subCategories?.split(",")
      : [];
  return (
    <>
      <Header
        category={
          slug ? (category?.name ?? "Explore Catalog") : "Explore Catalog"
        }
        activeSubCategories={subCategories}
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
