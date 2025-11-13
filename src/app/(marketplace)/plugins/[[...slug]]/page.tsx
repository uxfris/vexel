import { Metadata } from "next";
import Breadcrumb from "../../_components/breadcrumb";
import { PluginDetail } from "../components/plugin-detail";
import { notFound } from "next/navigation";
import PluginCard from "../../_components/plugin-card";
import Divider from "@/components/ui/divider";
import Footer from "../../../../components/ui/footer";
import Sidebar from "../../_components/sidebar/index";
import { prisma } from "@/lib/db/prisma";
import { serializePlugin } from "@/lib/utils/serializePlugin";

interface PluginPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: PluginPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugValue = slug?.[0];

  if (!slug) {
    return {
      title: "Plugin Not Found - AE Market",
      description: "The requested plugin could not be found.",
    };
  }

  const plugin = await prisma.plugin.findUnique({
    where: { slug: slugValue },
    select: {
      title: true,
      shortDescription: true,
    },
  });

  if (!plugin) {
    return {
      title: "Plugin Not Found - AE Market",
      description: "The requested plugin could not be found.",
    };
  }

  return {
    title: `${plugin.title} - AE Market`,
    description: plugin.shortDescription,
  };
}

export default async function PluginDetailPage({ params }: PluginPageProps) {
  const { slug } = await params;
  const slugValue = slug?.[0];

  const plugin = await prisma.plugin.findUnique({
    where: { slug: slugValue },
    include: {
      category: true,
      subcategory: true,
      tags: { include: { tag: true } },
      seller: { select: { name: true, slug: true } },
    },
  });

  if (!plugin) {
    notFound();
  }

  const tagIds = plugin.tags.map((pt) => pt.tagId);

  const relatedPlugins = await prisma.plugin.findMany({
    where: {
      id: { not: plugin.id }, // exclude the current one
      status: "PUBLISHED",
      OR: [
        { categoryId: plugin.categoryId },
        { subcategoryId: plugin.subcategoryId },
        {
          tags: {
            some: {
              tagId: { in: tagIds },
            },
          },
        },
      ],
    },
    include: {
      category: true,
      seller: { select: { name: true, slug: true } },
    },
    take: 9, // limit results
    orderBy: [
      { featured: "desc" },
      { downloadCount: "desc" },
      { createdAt: "desc" },
    ],
  });

  if (relatedPlugins.length < 4) {
    const sellerRelated = await prisma.plugin.findMany({
      where: {
        sellerId: plugin.sellerId,
        id: { not: plugin.id },
        status: "PUBLISHED",
      },
      take: 4,
      include: {
        category: true,
        seller: { select: { name: true, slug: true } },
      },
    });

    relatedPlugins.push(...sellerRelated);
  }

  return (
    <div className="mt-4 md:mt-0">
      <Breadcrumb />
      <h1 className="md:hidden text-3xl font-bold text-foreground mt-2">
        {plugin.title}
      </h1>
      <p className="md:hidden font-medium text-md text-muted-foreground mt-2 mb-4">
        {plugin.shortDescription}
      </p>
      <PluginDetail {...serializePlugin(plugin)} />
      <div className="mt-10">
        <h4 className="text-xl md:text-2xl font-bold">You may like these</h4>
        <Divider classNames=" mt-2 mb-4 md:mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
          {relatedPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              category={plugin.category}
              seller={plugin.seller}
            />
          ))}
        </div>
        <Footer />
      </div>
      <Sidebar isMobileOnly={true} />
    </div>
  );
}
