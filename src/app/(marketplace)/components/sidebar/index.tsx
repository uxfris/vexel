import SidebarContent from "./sidebarContent";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 86400; //24 cache

export default async function Sidebar({
  isMobileOnly,
}: {
  isMobileOnly?: boolean;
}) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return <SidebarContent isMobileOnly={isMobileOnly} categories={categories} />;
}
