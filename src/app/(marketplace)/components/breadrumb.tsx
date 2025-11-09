"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { ChevronRight } from "lucide-react";
import { formatLabel } from "@/lib/utils/format";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Map for nicer, custom names
  const labelMap: Record<string, string> = {
    catalog: "Plugins",
  };

  // Capitalize helper

  return (
    <nav className="font-semibold text-muted-foreground">
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition"
          >
            Vexel
          </Link>
        </li>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              →
              {isLast ? (
                <span className="text-muted-foreground">
                  {formatLabel(segment, labelMap)}
                </span>
              ) : (
                <Link
                  href={href}
                  className={cn(
                    "text-primary",
                    isLast && "text-muted-foreground cursor-text"
                  )}
                >
                  {formatLabel(segment, labelMap)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
