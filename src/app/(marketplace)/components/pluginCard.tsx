import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Category, Plugin, Seller } from "@/lib/prisma/client";

const PluginCard = ({
  plugin,
  category,
  seller,
}: {
  plugin: Plugin;
  category: Category;
  seller: Pick<Seller, "name" | "slug">;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="group flex flex-col">
        <div className=" relative">
          <Link href={`/plugins/${plugin.slug}`}>
            <div className="relative w-full h-full">
              <Image
                src={plugin.thumbnailUrl}
                alt="Product Image"
                width={560}
                height={560}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-0 duration-500 transition-opacity"
              />
              <Image
                src={plugin.demoGifUrl}
                alt="Product Image"
                width={560}
                height={560}
                unoptimized
                className="w-full h-full object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          </Link>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              className="p-2 h-8 text-foreground rounded-[12px] hover:bg-background"
            >
              <Heart width={16} height={16} />
            </Button>
            <Button
              variant="accent"
              className="p-2 h-8 rounded-[12px] hover:bg-accent/80"
            >
              <ShoppingCart width={16} height={16} />
            </Button>
          </div>
        </div>
        <Link href={`/plugins/${plugin.slug}`}>
          <div className="flex items-baseline justify-between">
            <p className="font-bold text-lg md:text-xl mt-2">
              {" "}
              {plugin.title}{" "}
            </p>
            {Number(plugin.price) === 0 && (
              <div className="bg-accent text-accent-foreground border border-accent-border px-1 rounded-md font-semibold text-sm">
                Free
              </div>
            )}
            {Number(plugin.price) !== 0 && (
              <p className="font-bold text-sm md:text-base text-muted-foreground-secondary">
                from $
                {Number(plugin.discountPrice) === 0
                  ? plugin.price.toString()
                  : plugin.discountPrice.toString()}{" "}
                {Number(plugin.discountPrice) !== 0 && (
                  <span className="line-through">
                    ${plugin.price.toString()}
                  </span>
                )}
              </p>
            )}
          </div>
        </Link>
        <Link href={`/plugins/${plugin.slug}`}>
          <p className="text-muted-foreground-secondary font-medium mt-2">
            {plugin.description}
          </p>
        </Link>
      </div>
      <p className="text-muted-foreground-secondary font-medium mt-2">
        By{" "}
        <Link
          href={`/creator/${seller.slug}`}
          className="font-bold text-foreground"
        >
          {seller.name}
        </Link>{" "}
        in{" "}
        <Link
          href={`/catalog/${category.slug}`}
          className="font-bold text-foreground"
        >
          {category.name}
        </Link>
      </p>
    </div>
  );
};

export default PluginCard;
