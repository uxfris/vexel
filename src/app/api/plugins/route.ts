import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  const category = await prisma.category.findFirst({
    where: { slug: categorySlug || undefined },
  });

  const plugins = await prisma.plugin.findMany({
    where: { categoryId: category?.id },
    include: { seller: { select: { name: true, slug: true } } },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(plugins);
}
