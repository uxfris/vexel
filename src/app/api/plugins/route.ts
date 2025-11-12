// app/api/plugins/route.ts
import { NextResponse } from "next/server";
import { getPlugins } from "@/lib/db/getPlugins";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug") || undefined;
  const pricing = (searchParams.get("pricing") || "paid_free") as any;
  const sort = (searchParams.get("sort") || "recent") as any;
  const subcategories = searchParams.get("subcategories")?.split(",") ?? [];
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const data = await getPlugins({
    slug,
    pricing,
    sort,
    subcategories,
    page,
    limit,
  });
  return NextResponse.json(data);
}
