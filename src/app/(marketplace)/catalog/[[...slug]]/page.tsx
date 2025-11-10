import Header from "../../components/header";
import PluginCard from "../../components/pluginCard";
import { PLUGINS } from "@/lib/utils/constants";

const mock = {
  featured: [
    {
      id: 1,
      name: "Arc: Easy Ease",
      description:
        "Arc: Easy Ease is a plugin for Adobe After Effects that allows you to create easy transitions between clips.",
      creator: "Creative Jim",
      category: "Featured",
      price: 100,
    },
  ],
  animation: [
    {
      id: 2,
      name: "Shapes: Path Animation",
      description:
        "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
      creator: "Creative John",
      category: "Animation",
      price: 200,
    },
  ],
  "text-typography": [
    {
      id: 3,
      name: "Shapes: Path Animation",
      description:
        "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
      creator: "Creative John",
      category: "Text & Typography",
      price: 300,
    },
  ],
  all: [
    {
      id: 1,
      name: "Arc: Easy Ease",
      description:
        "Arc: Easy Ease is a plugin for Adobe After Effects that allows you to create easy transitions between clips.",
      creator: "Creative Jim",
      category: "Animation",
      price: 100,
    },
    {
      id: 2,
      name: "Shapes: Path Animation",
      description:
        "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
      creator: "Creative John",
      category: "Animation",
      price: 200,
    },
    {
      id: 3,
      name: "Shapes: Path Animation",
      description:
        "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
      creator: "Creative John",
      category: "Animation",
      price: 300,
    },
    {
      id: 4,
      name: "VFX & Particles",
      description:
        "VFX & Particles is a plugin for Adobe After Effects that allows you to create VFX and particles for your projects.",
      creator: "Creative Jane",
      category: "Animation",
      price: 400,
    },
  ],
};
type CategoryKey = keyof typeof mock;

async function getItemsByCategory(slug?: string) {
  const isCategory = (value: any): value is CategoryKey =>
    value === "featured" ||
    value === "animation" ||
    value === "text-typography" ||
    value === "all";

  if (isCategory(slug)) return mock[slug];
  return mock.all;
}

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
  console.log(slugValue);

  const data = await getItemsByCategory(slugValue);

  const subCategories =
    typeof resolveSearchParams.subCategories === "string"
      ? resolveSearchParams.subCategories?.split(",")
      : [];
  return (
    <>
      <Header
        category={slug ? data[0]?.category : "Explore Catalog"}
        activeSubCategories={subCategories}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
        {PLUGINS.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} />
        ))}
      </div>
    </>
  );
}
