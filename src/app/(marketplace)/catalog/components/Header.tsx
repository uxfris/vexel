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

const Header = ({ category }: { category: string }) => {
  return (
    <>
      <div className="h-15"></div>
      <div className="text-md font-semibold flex items-center gap-2">
        <span className="cursor-pointer">Vexel</span>→
        <span className="cursor-pointer">Plugins</span>→
        <span className="font-medium text-muted-foreground">{category}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold py-5">{category}</h1>
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
    </>
  );
};

export default Header;
