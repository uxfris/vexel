"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Heart, Info, ShoppingCart, X } from "lucide-react";
import { SiFigma, SiSketchfab } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils/cn";
import { useMedia } from "use-media";
import Divider from "@/components/ui/divider";
import { useEffect, useRef, useState } from "react";
import { Plugin } from "@/lib/prisma/client";

type SerializedPlugin = Omit<Plugin, "price" | "discountPrice"> & {
  price: number | null;
  discountPrice: number | null;
};

export function PluginDetail(plugin: SerializedPlugin) {
  const isMobile = useMedia({ maxWidth: 767 });
  const demoImages = plugin.images;
  const displayedImages = isMobile ? demoImages.slice(0, 4) : demoImages;

  const [modalOpen, setModalOpen] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalOpen && targetIndex !== null && modalScrollRef.current) {
      const scrollContainer = modalScrollRef.current;
      const target = modalScrollRef.current.querySelector(
        `[data-index="${targetIndex}"]`
      ) as HTMLElement | null;
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        const offset = 450;
        scrollContainer.scrollBy({ top: -offset, behavior: "auto" });
      }
    }
  }, [modalOpen, targetIndex]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", modalOpen);
  }, [modalOpen]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-2 md:gap-10 md:-mt-8">
      <div className="max-w-[1110px] w-full flex flex-col gap-4 md:pt-12">
        {displayedImages.map((image: string, index: number) => (
          <button
            key={image}
            onClick={() => {
              setModalOpen(true);
              setTargetIndex(index);
            }}
            className="cursor-pointer"
          >
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
      <div className="lg:max-w-[425px] md:pt-12 md:sticky md:top-0 self-start w-full">
        <Creator plugin={plugin} classNames="hidden md:block text-md" />
        <div className="flex flex-col gap-7 mt-2">
          <h1 className="hidden md:block text-4xl font-bold text-foreground">
            {plugin.title}
          </h1>
          <p className="hidden md:block font-medium text-lg text-muted-foreground mb-2">
            {plugin.shortDescription}
          </p>
          <Button
            onClick={() => setModalOpen(true)}
            size="lg"
            variant="outline"
            className="md:hidden shadow-sm font-bold bg-muted border border-border text-foreground text-md h-12"
          >
            Explore More
          </Button>
          <div className="flex gap-2 flex-col md:flex-row">
            <MenuButtonItems icon={Info} title="Info" onClick={() => {}} />
            {plugin.price !== 0 && (
              <MenuButtonItems
                icon={DownloadCloud}
                title="Trial"
                onClick={() => {}}
              />
            )}
            <MenuButtonItems icon={Heart} title="Save" onClick={() => {}} />
          </div>
        </div>
        <div className="border-t border-border w-full my-8"></div>
        <ShoppingCartButton plugin={plugin} />
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
      {modalOpen && (
        <div
          ref={modalScrollRef}
          className="fixed inset-0 bg-background overflow-y-scroll z-100"
        >
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-full fixed top-4 right-4 z-10 border border-border w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer bg-background"
          >
            <X className="text-foreground w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="mx-auto">
            <StickyHeader plugin={plugin} scrollRef={modalScrollRef} />
            <Divider classNames="mb-7" />
            <div className="max-w-6xl mx-auto space-y-6 mb-20 px-4">
              {plugin.images.map((image: string, index: number) => (
                <Image
                  key={image}
                  data-index={index}
                  src={image}
                  width={560}
                  height={560}
                  alt={"Demo Image"}
                  className="w-full rounded-lg border border-border overflow-clip"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StickyHeader({
  plugin,
  scrollRef,
}: {
  plugin: SerializedPlugin;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 0);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <div
      className={cn(
        "sticky top-0 bg-background transition-all duration-200",
        scrolled ? "shadow-xl" : "shadow-none"
      )}
    >
      <div className="max-w-6xl flex flex-col lg:flex-row items-start justify-between pt-3 md:pt-7 pb-5 px-4 mx-auto">
        <div className="space-y-4 md:space-y-1">
          <Creator plugin={plugin} classNames="text-base hidden md:block" />
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            {plugin.title}
          </h1>
          <p className="hidden md:block font-medium text-lg text-muted-foreground mb-2">
            {plugin.shortDescription}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-9 px-3
           md:h-10 md:px-3 md:py-2"
          >
            <Heart className="w-4 md:w-5 text-foreground" />
          </Button>
          <ShoppingCartButton
            plugin={plugin}
            classNames="h-9 text-sm md:text-base md:px-3 md:py-2 md:h-10"
          />
        </div>
      </div>
    </div>
  );
}

function ShoppingCartButton({
  plugin,
  classNames,
}: {
  plugin: SerializedPlugin;
  classNames?: string;
}) {
  const isDiscount = plugin.discountPrice !== 0;
  return (
    <Button
      size="lg"
      variant="accent"
      className={cn(
        "flex gap-2 px-4 font-bold text-md shadow-sm w-full md:w-auto h-12",
        classNames
      )}
    >
      <ShoppingCart />
      {plugin.price === 0
        ? "Get for Free"
        : `Buy From ${isDiscount ? plugin.discountPrice : plugin.price}{" "}`}
      {isDiscount && (
        <span className="text-muted-foreground-secondary line-through">
          ${plugin.price}
        </span>
      )}
    </Button>
  );
}

function Creator({ plugin, classNames }: { plugin: any; classNames: string }) {
  return (
    <p
      className={cn("font-semibold text-sm text-muted-foreground", classNames)}
    >
      by{" "}
      <Link href={`/creator/${plugin.seller.slug}`} className="text-foreground">
        {plugin.seller.name}
      </Link>{" "}
      in{" "}
      <Link
        href={`/catalog/${plugin.category.slug}`}
        className="text-foreground"
      >
        {plugin.category.name}
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
