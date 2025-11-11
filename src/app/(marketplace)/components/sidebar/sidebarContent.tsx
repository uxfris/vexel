import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { PLUGIN_CATEGORIES } from "@/lib/utils/constants";
import { prisma } from "@/lib/db/prisma";

export default async function SidebarContent({
  activePath,
}: {
  activePath: string;
}) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const activeSlug = activePath.split("/").pop();
  return (
    <>
      <h5 className="text-sm font-semibold text-muted-foreground-secondary mb-2">
        CATALOG
      </h5>
      <div className="flex flex-col space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalog/${category.slug}`}
            className={cn(
              "flex items-center gap-3 pl-0 rounded-md cursor-pointer hover:bg-sidebar-primary transition-colors duration-200",
              activeSlug === category.slug
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : ""
            )}
          >
            <div className="border border-border rounded-sm p-1 w-9 h-9 flex items-center justify-center">
              {category.icon}
            </div>
            <p className="text-sm font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
