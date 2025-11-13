"use client";

import { ChevronDown } from "lucide-react";
import Breadcrumb from "./breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/filter-dropdown";
import { pricingOptions, sortOptions } from "@/lib/utils/constants";
import { updateQueryParam } from "@/lib/utils/queryparams";

type SubCategory = {
  id: string;
  name: string;
};

interface HeaderProps {
  category: string;
  subcategories: SubCategory[];
  activeSubcategories: string[];
}

const Header = ({
  category,
  subcategories,
  activeSubcategories,
}: HeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeSubcat, setActiveSubcat] =
    useState<string[]>(activeSubcategories);

  useEffect(() => {
    const current = searchParams.get("subcategories");

    setActiveSubcat(current ? current.split(",") : []);
  }, [searchParams]);

  const handleClick = (tagId: string) => {
    const current = searchParams.get("subcategories");
    const selected = current ? current.split(",") : [];

    let newSubcat = selected.includes(tagId)
      ? selected.filter((id) => id != tagId)
      : [...selected, tagId];

    const params = new URLSearchParams(searchParams.toString());
    if (newSubcat.length > 0) params.set("subcategories", newSubcat.join(","));
    else params.delete("subcategories");
    router.push(`?${params.toString()}`);

    setActiveSubcat(newSubcat);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategories");
    router.push(`?${params.toString()}`);
    setActiveSubcat([]);
  };

  return (
    <>
      <div className="h-15"></div>
      <Breadcrumb />
      <h1 className="text-3xl md:text-5xl font-bold py-5">{category}</h1>
      <p className="text-md font-medium text-muted-foreground pb-5">
        Discover the best animation plugins for your projects.
      </p>
      <div className="wrap space-x-2">
        {subcategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleClick(category.id)}
            variant={"outline"}
            className={cn(
              "shadow-xs py-2 px-4 text-sm rounded-full",
              activeSubcat.includes(category.id)
                ? "border-blue-600 text-blue-600 hover:text-blue-600"
                : ""
            )}
          >
            <p> {category.name} </p>
          </Button>
        ))}
        {activeSubcat.length > 0 && (
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
            defaultValue={searchParams.get("sort") || "recent"}
            onChange={(value) =>
              updateQueryParam(router, searchParams, "sort", value)
            }
          />
          <FilterDropdown
            options={pricingOptions}
            defaultValue={searchParams.get("pricing") || "paid_free"}
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
