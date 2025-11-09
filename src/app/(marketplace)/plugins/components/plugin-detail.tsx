"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Heart, Info, ShoppingCart } from "lucide-react";
import { SiFigma, SiSketchfab } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils/cn";

export function PluginDetail({ plugin }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-10 mt-5">
      <div className="md:col-span-3 flex flex-col gap-4">
        {plugin.demoImages.map((image: string) => (
          <button key={image}>
            <Image
              src={image}
              width={560}
              height={560}
              alt={"Demo Image"}
              className="w-full rounded-lg border border-border overflow-clip"
            />
          </button>
        ))}
      </div>
      <div className="md:col-span-2">
        <Creator plugin={plugin} classNames="hidden md:block text-md" />
        <div className="flex flex-col gap-7 mt-2">
          <h1 className="hidden md:block text-4xl font-bold text-foreground">
            {plugin.title}
          </h1>
          <p className="hidden md:block font-medium text-lg text-muted-foreground mb-2">
            {plugin.shortDesc}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="md:hidden shadow-sm font-bold bg-muted border border-border text-foreground text-md h-12"
          >
            Explore More
          </Button>
          <div className="flex gap-2 flex-col md:flex-row">
            <MenuButtonItems icon={Info} title="Info" onClick={() => {}} />
            <MenuButtonItems
              icon={DownloadCloud}
              title="Trial"
              onClick={() => {}}
            />
            <MenuButtonItems icon={Heart} title="Save" onClick={() => {}} />
          </div>
        </div>
        <div className="border-t border-border w-full my-8"></div>
        <div className="flex gap-2">
          <Button
            size="lg"
            variant="accent"
            className="flex gap-2 px-4 font-bold text-md shadow-sm w-full md:w-auto h-12"
          >
            <ShoppingCart />
            Buy From ${plugin.discount_price}{" "}
            <span className="text-muted-foreground-secondary line-through">
              ${plugin.price}
            </span>
          </Button>
        </div>
        <p className=" mt-6 text-muted-foreground whitespace-pre-line md:text-lg font-medium">
          {plugin.description}
        </p>
        <div className="flex flex-col gap-2 mt-10">
          <p className="uppercase text-sm text-muted-foreground-secondary font-semibold">
            Compatible With
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-11 bg-muted">
              <SiFigma color="#0" />
            </Button>
            <Button variant="outline" size="sm" className="h-11 bg-muted">
              <SiSketchfab color="#0" />
            </Button>
          </div>
          <Creator plugin={plugin} classNames="md:hidden mt-3" />
        </div>
      </div>
    </div>
  );
}

function Creator({ plugin, classNames }: { plugin: any; classNames: string }) {
  return (
    <p
      className={cn("font-semibold text-sm text-muted-foreground", classNames)}
    >
      by{" "}
      <Link href={"/creator/creator-slug"} className="text-foreground">
        {plugin.creator.name}
      </Link>{" "}
      in{" "}
      <Link href={"/catalog/category-slug"} className="text-foreground">
        {plugin.category}
      </Link>
    </p>
  );
}

function MenuButtonItems({
  icon: Icon,
  title,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex  items-center gap-2 text-md w-full md:w-auto"
    >
      <Icon className="w-5 h-5" />
      {title}
    </Button>
  );
}
