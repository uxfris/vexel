"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PLUGINS, PLUGIN_CATEGORIES } from "@/lib/utils/constants";
import Link from "next/link";
import { useSearch } from "../context/search-context";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { useDebounce } from "@/lib/hooks/useDebounce";

const SearchPlugin = () => {
  const { open, close } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const isTyping = searchQuery != debouncedQuery;
    setIsLoading(isTyping);

    //Fetch API data here
  }, [debouncedQuery]);

  // Auto-focus input when open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.classList.add("overflow-hidden");
      return () => {
        clearTimeout(timer);
        document.body.classList.remove("overflow-hidden");
      };
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overscroll-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "w-full md:mt-20 md:max-w-lg bg-white md:rounded-2xl shadow-xl flex flex-col  overflow-hidden h-full",
              PLUGINS.length > 0 ? "md:h-[70vh]" : "md:h-auto"
            )}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header with search input */}{" "}
            <div className="flex items-center gap-2 p-2 border-b border-border">
              {" "}
              <Search className="w-5 h-5 text-muted-foreground" />{" "}
              <Input
                ref={inputRef}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for plugins"
                className="border-0 font-bold text-md placeholder:text-muted-foreground-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 flex-1"
              />{" "}
              <button onClick={close} className="cursor-pointer">
                {" "}
                <X className="md:hidden w-5 h-5 text-muted-foreground" />{" "}
                <ArrowRight className="hidden md:block text-muted-foreground-secondary border border-border rounded-lg p-1 w-12 h-8" />
              </button>{" "}
            </div>
            {/* Not Found State */}
            {/* <div className="flex-1 flex flex-col items-center justify-center p-2">
              <Image src={""} alt={""} />
              <p className="font-bold">Nothing Found</p>
            </div> */}
            {/* Loading State */}
            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center p-2">
                <Spinner />
              </div>
            )}
            {/* Plugin Items */}
            <div className="flex-1 flex flex-col overflow-y-auto p-2">
              {PLUGINS.map((plugin) => (
                <Link
                  key={plugin.id}
                  href={`/detail`}
                  className="flex items-center gap-4 p-2 rounded hover:bg-muted transition"
                  onClick={close}
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
            </div>
            {!searchQuery && (
              <div className="md:hidden flex-1 flex flex-col overflow-y-auto p-2">
                {PLUGIN_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/catalog/${category.slug}`}
                    className="flex items-center gap-4 p-2 rounded hover:bg-muted transition"
                    onClick={close}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPlugin;
