import Header from "../components/Header";
import PluginCard from "../components/PluginCard";

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
// hasilnya: "featured" | "animation" | "text-typography" | "all"

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
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const slug = (await params).slug?.[0];
  const data = await getItemsByCategory(slug);
  return (
    <>
      <Header category={slug ? data[0]?.category : ""} />
      <PluginCard />
    </>
  );
}
