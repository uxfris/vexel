"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../hooks/use-sidebar";
import { useEffect } from "react";
import { Category } from "@/lib/prisma/client";

export default function SidebarContent({
  categories,
  isMobileOnly,
}: {
  categories: Category[];
  isMobileOnly?: boolean;
}) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop();
  const { open, close } = useSidebar();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <aside
      className={cn(
        "sticky top-0 self-start z-50 h-screen md:flex flex-col p-4 border-r border-border w-64 overflow-y-auto",
        isMobileOnly ? "md:hidden" : "",
        open ? "block fixed top-14 left-0 z-50 w-full bg-background" : "hidden"
      )}
    >
      <h5 className="text-sm font-semibold text-muted-foreground-secondary mb-2">
        CATALOG
      </h5>
      <div className="flex flex-col space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            onClick={close}
            href={`/catalog/${category.slug}`}
            className={cn(
              "flex items-center gap-3 pl-0 rounded-md cursor-pointer hover:bg-sidebar-primary transition-colors duration-200",
              activeSlug === category.slug
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : ""
            )}
          >
            <div className="border border-border rounded-sm p-1 w-9 h-9 flex items-center justify-center uppercase">
              {category.icon?.charAt(0)}
            </div>
            <p className="text-sm font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
