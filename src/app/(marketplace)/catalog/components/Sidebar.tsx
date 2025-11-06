"use client";

import {
  PaletteIcon,
  SparklesIcon,
  StarIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useSidebar } from "../context/SidebarContext";

const categories = [
  {
    id: 1,
    icon: <StarIcon />,
    name: "Featured",
  },
  {
    id: 2,
    icon: <VideoIcon />,
    name: "Animation",
  },
  {
    id: 3,
    icon: <TextIcon />,
    name: "Text & Typography",
  },
  {
    id: 4,
    icon: <SparklesIcon />,
    name: "VFX & Particles",
  },
  {
    id: 5,
    icon: <PaletteIcon />,
    name: "Color & Grading",
  },
];

const Sidebar = () => {
  const { open } = useSidebar();
  return (
    <aside
      className={cn(
        "md:flex flex-col p-4 border-r border-border w-1/4 h-screen overflow-y-auto",
        open ? "block fixed top-14 left-0 z-50 w-full bg-background" : "hidden"
      )}
    >
      <h5 className="text-sm font-semibold text-muted-foreground-secondary mb-2">
        CATALOG
      </h5>
      <div className="flex flex-col space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "flex items-center gap-3 pl-0 rounded-md cursor-pointer hover:bg-sidebar-primary transition-colors duration-200",
              category.id === 1
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : ""
            )}
          >
            <div className="border border-border rounded-sm p-1 w-9 h-9 flex items-center justify-center">
              {category.icon}
            </div>
            <p className="text-sm font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
