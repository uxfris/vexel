"use client";

import { cn } from "@/lib/utils/cn";
import { useSidebar } from "../../hooks/useSidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PLUGIN_CATEGORIES } from "@/lib/utils/constants";
import { useEffect } from "react";
import SidebarContent from "./sidebarContent";

const Sidebar = ({ isMobileOnly }: { isMobileOnly?: boolean }) => {
  const pathname = usePathname();
  const { open } = useSidebar();

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
      <SidebarContent activePath={pathname} />
    </aside>
  );
};

export default Sidebar;
