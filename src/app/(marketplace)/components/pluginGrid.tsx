"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PluginSkeleton from "./pluginSkeleton";
import PluginCard from "./pluginCard";

export default function PluginGrid({
  initialPlugins,
  slug,
  pricing,
  sort,
  subcategories,
}: {
  initialPlugins: any[];
  slug?: string;
  pricing: string;
  sort: string;
  subcategories: string[];
}) {
  const [plugins, setPlugins] = useState(initialPlugins);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🧹 Reset on category/filter change
  useEffect(() => {
    setIsSwitching(true);
    setPlugins([]);
    setTimeout(() => {
      setPlugins(initialPlugins);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
      setIsSwitching(false);
    }, 300);
  }, [slug, sort, pricing, subcategories, initialPlugins]);

  // 🚀 Infinite load
  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const nextPage = page + 1;
    const params = new URLSearchParams({
      page: nextPage.toString(),
      limit: "20",
      sort,
      pricing,
    });
    if (slug) params.set("slug", slug);
    if (subcategories?.length)
      params.set("subcategories", subcategories.join(","));

    const res = await fetch(`/api/plugins?${params.toString()}`);
    const data = await res.json();

    if (data.plugins.length === 0) {
      setHasMore(false);
    } else {
      setPlugins((prev) => [...prev, ...data.plugins]);
      setPage(nextPage);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, isLoading, slug, sort, pricing, subcategories]);

  return (
    <>
      <motion.div
        key={`${slug}-${sort}-${pricing}-${subcategories.join(",")}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15"
      >
        <AnimatePresence mode="popLayout">
          {isSwitching
            ? Array.from({ length: 8 }).map((_, i) => (
                <PluginSkeleton key={i} />
              ))
            : plugins.map((plugin, i) => (
                <motion.div
                  key={plugin.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{
                    duration: 0.25,
                    delay: i * 0.02,
                  }}
                >
                  <PluginCard
                    plugin={plugin}
                    category={plugin.category}
                    seller={plugin.seller}
                  />
                </motion.div>
              ))}
        </AnimatePresence>

        {/* Infinite scroll skeleton */}
        {isLoading &&
          !isSwitching &&
          Array.from({ length: 4 }).map((_, i) => (
            <PluginSkeleton key={`load-${i}`} />
          ))}
      </motion.div>

      {/* Observer target */}
      <div ref={observerRef} className="h-10" />

      {!hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-10 text-gray-400 text-sm"
        >
          You've reached the end 🎉
        </motion.div>
      )}
    </>
  );
}
