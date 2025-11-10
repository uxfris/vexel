"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PLUGINS, PLUGIN_CATEGORIES } from "@/lib/utils/constants";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { motion } from "framer-motion";
import { useModal } from "@/lib/hooks/useModal";
import useAutoFocus from "@/lib/hooks/useAutoFocus";
import { cn } from "@/lib/utils/cn";

export default function SearchPluginModal() {
  const { closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const isTyping = searchQuery !== debouncedQuery;
    setIsLoading(isTyping);
  }, [debouncedQuery]);

  useAutoFocus(inputRef);

  return (
    <motion.div
      className={cn(
        "flex flex-col h-screen",
        PLUGINS.length > 0 ? "md:h-[80vh]" : "md:h-auto"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-2 border-b border-border">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for plugins"
          className="border-0 font-bold text-md flex-1"
        />
        <button onClick={closeModal}>
          <X className="md:hidden w-5 h-5 text-muted-foreground" />
          <ArrowRight className="hidden md:block text-muted-foreground-secondary border border-border rounded-lg p-1 w-12 h-8" />
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Plugins */}
      {!isLoading && (
        <motion.div className="flex-1 flex flex-col overflow-y-auto p-2">
          {PLUGINS.map((plugin) => (
            <Link
              key={plugin.id}
              href={`/detail`}
              className="flex items-center gap-4 p-2 rounded hover:bg-muted transition"
              onClick={closeModal}
            >
              <Image
                src={plugin.images[0]}
                alt="Product Image"
                width={560}
                height={560}
                className="w-20 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h5 className="font-bold text-xl">{plugin.name}</h5>
                <p className="text-muted-foreground-secondary">
                  By{" "}
                  <span className="font-medium text-foreground">
                    {plugin.creator}
                  </span>{" "}
                  in{" "}
                  <span className="font-medium text-foreground">
                    {plugin.category}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {/* Categories */}
      {!searchQuery && (
        <div className="md:hidden flex-1 flex flex-col overflow-y-auto p-2">
          {PLUGIN_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/catalog/${category.slug}`}
              className="flex items-center gap-4 p-2 rounded hover:bg-muted transition"
              onClick={closeModal}
            >
              <div className="flex items-center justify-center border border-border rounded-lg text-3xl w-14 h-14">
                {category.icon}
              </div>
              <div className="flex flex-col">
                <h5 className="font-bold text-sm">{category.name}</h5>
                <p className="font-medium text-muted-foreground text-sm">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
