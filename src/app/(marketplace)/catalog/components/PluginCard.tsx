import Link from "next/link";
import Image from "next/image";

const plugins = [
  {
    id: 1,
    name: "Arc: Easy Ease",
    description:
      "Arc: Easy Ease is a plugin for Adobe After Effects that allows you to create easy transitions between clips.",
    creator: "Creative Jim",
    category: "Animation",
    price: 100,
  },
  {
    id: 2,
    name: "Shapes: Path Animation",
    description:
      "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
    creator: "Creative John",
    category: "Animation",
    price: 200,
  },
  {
    id: 3,
    name: "Shapes: Path Animation",
    description:
      "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
    creator: "Creative John",
    category: "Animation",
    price: 300,
  },
  {
    id: 4,
    name: "VFX & Particles",
    description:
      "VFX & Particles is a plugin for Adobe After Effects that allows you to create VFX and particles for your projects.",
    creator: "Creative Jane",
    category: "Animation",
    price: 400,
  },
];

import React from "react";

const PluginCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
      {plugins.map((plugin) => (
        <div key={plugin.id} className="flex flex-col w-full">
          <div className="group flex flex-col gap-1.5">
            <Link href="/detail">
              <Image
                src="https://marketstorage.b-cdn.net/previews/1fbc3d69-c0b3-49a0-8784-4a2edd8b44dd/1.jpg?width=560"
                alt="Product Image"
                width={560}
                height={560}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
            <p className="font-bold text-xl"> {plugin.name} </p>
            <p className="text-muted-foreground-secondary font-medium">
              {plugin.description}
            </p>
          </div>
          <p className="text-muted-foreground-secondary font-medium mt-2">
            By{" "}
            <span className="font-bold text-foreground">{plugin.creator}</span>{" "}
            in{" "}
            <span className="font-bold text-foreground">{plugin.category}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PluginCard;
