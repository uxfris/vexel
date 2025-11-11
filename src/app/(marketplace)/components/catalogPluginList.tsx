"use client";

import { Category } from "@/lib/prisma/client";
import PluginCard from "./pluginCard";
import { useEffect, useRef, useState } from "react";
import { PluginWithSeller } from "@/types/plugin";

export default function PluginList({ category }: { category: Category }) {
  const [plugins, setPlugins] = useState<PluginWithSeller[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 12;
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPlugins = async () => {
      setLoading(true);
      const res = await fetch(`/api/plugins?category=${category.slug || ""}`);
      const data = await res.json();
      setPlugins((prev) => [...prev, ...data]);
      setLoading(false);
    };
    fetchPlugins();
  }, [skip, category.slug]);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setSkip((prev) => prev + limit);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
        {plugins.map((plugin) => (
          <PluginCard
            key={plugin.id}
            plugin={plugin}
            category={category}
            seller={plugin.seller}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {loading && <p>Loading more...</p>}
      </div>
    </>
  );
}
