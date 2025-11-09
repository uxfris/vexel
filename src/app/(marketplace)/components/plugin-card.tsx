import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const PluginCard = ({ plugin }: { plugin: any }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="group flex flex-col">
        <div className=" relative">
          <Link href={`/plugins/${plugin.slug}`}>
            <div className="relative w-full h-full">
              <Image
                src={plugin.images[0]}
                alt="Product Image"
                width={560}
                height={560}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-0 duration-500 transition-opacity"
              />
              <Image
                src={plugin.images[1]}
                alt="Product Image"
                width={560}
                height={560}
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
              variant="default"
              className="p-2 h-8 bg-accent text-foreground rounded-[12px] hover:bg-accent/80"
            >
              <ShoppingCart width={16} height={16} />
            </Button>
          </div>
        </div>
        <Link href={`/plugins/${plugin.slug}`}>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg md:text-xl mt-2"> {plugin.name} </p>
            <p className="font-bold text-sm md:text-base text-muted-foreground-secondary">
              from $10 <span className="line-through">$20</span>
            </p>
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
          href={`/creator/creator-slug`}
          className="font-bold text-foreground"
        >
          {plugin.creator}
        </Link>{" "}
        in{" "}
        <Link
          href={`/catalog/category-slug`}
          className="font-bold text-foreground"
        >
          {plugin.category}
        </Link>
      </p>
    </div>
  );
};

export default PluginCard;
