import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PluginCard from "../components/PluginCard";

const tags = [
  {
    id: "1",
    name: "Animation",
  },
  {
    id: "2",
    name: "Text",
  },
];
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
      <div className="h-15"></div>
      <div className="text-md font-semibold flex items-center gap-2">
        <span className="cursor-pointer">Vexel</span>→
        <span className="cursor-pointer">Plugins</span>→
        <span className="font-medium text-muted-foreground">
          {data[0].category}
        </span>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold py-5">
        {data[0].category}
      </h1>
      <p className="text-md font-medium text-muted-foreground pb-5">
        Discover the best animation plugins for your projects.
      </p>
      <div className="wrap space-x-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={"outline"}
            className="shadow-xs py-2 px-4"
          >
            <p className="text-sm text-muted-foreground"> {tag.name} </p>
          </Badge>
        ))}
      </div>
      <div className="mt-10">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">Recent</p>
            <ChevronDown className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">Paid + Free</p>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
        <div className="h-px border-b border-border mt-3 mb-6"></div>
      </div>
      <PluginCard />
    </>
  );
}
