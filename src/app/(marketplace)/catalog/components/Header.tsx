"use client";

import { ChevronDown } from "lucide-react";
import Breadcrumb from "./Breadrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/filter-dropdown";
import { pricingOptions, sortOptions } from "@/lib/utils/constants";
import { updateQueryParam } from "@/lib/utils/queryparams";

const tags = [
  {
    id: "1",
    name: "Animation",
    slug: "animation",
  },
  {
    id: "2",
    name: "Text",
    slug: "text",
  },
];

interface HeaderProps {
  category: string;
  activeSubCategories: string[];
}

const Header = ({ category, activeSubCategories }: HeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTags, setActiveTags] = useState<string[]>(activeSubCategories);

  useEffect(() => {
    const current = searchParams.get("subcategories");

    setActiveTags(current ? current.split(",") : []);
  }, [searchParams]);

  const handleClick = (tagId: string) => {
    const current = searchParams.get("subcategories");
    const selected = current ? current.split(",") : [];

    let newTags = selected.includes(tagId)
      ? selected.filter((id) => id != tagId)
      : [...selected, tagId];

    const params = new URLSearchParams(searchParams.toString());
    if (newTags.length > 0) params.set("subcategories", newTags.join(","));
    else params.delete("subcategories");
    router.push(`?${params.toString()}`);

    setActiveTags(newTags);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategories");
    router.push(`?${params.toString()}`);
    setActiveTags([]);
  };

  return (
    <>
      <div className="h-15"></div>
      <Breadcrumb category={category} />
      <h1 className="text-3xl md:text-5xl font-bold py-5">{category}</h1>
      <p className="text-md font-medium text-muted-foreground pb-5">
        Discover the best animation plugins for your projects.
      </p>
      <div className="wrap space-x-2">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            onClick={() => handleClick(tag.id)}
            variant={"outline"}
            className={cn(
              "shadow-xs py-2 px-4 text-sm rounded-full",
              activeTags.includes(tag.id)
                ? "border-blue-600 text-blue-600 hover:text-blue-600"
                : ""
            )}
          >
            <p> {tag.name} </p>
          </Button>
        ))}
        {activeTags.length > 0 && (
          <Button
            onClick={clearAll}
            variant="outline"
            className="shadow-xs py-2 px-4 text-sm rounded-full"
          >
            <p className="text-muted-foreground-secondary">Clear all</p>
          </Button>
        )}
      </div>
      <div className="mt-10">
        <div className="flex gap-4 items-center justify-between">
          <FilterDropdown
            options={sortOptions}
            defaultValue="Recent"
            onChange={(value) =>
              updateQueryParam(router, searchParams, "sort", value)
            }
          />
          <FilterDropdown
            options={pricingOptions}
            defaultValue="Paid + Free"
            buttonClassName="text-sm"
            onChange={(value) =>
              updateQueryParam(router, searchParams, "pricing", value)
            }
          />
        </div>
        <div className="h-px border-b border-border mt-3 mb-6"></div>
      </div>
    </>
  );
};

export default Header;
