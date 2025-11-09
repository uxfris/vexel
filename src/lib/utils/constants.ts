export const AE_VERSIONS = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "CC 2020",
  "CC 2019",
] as const;

export const OS_COMPATIBILITY = ["Windows", "macOS", "Linux"] as const;

export const PLUGIN_CATEGORIES = [
  {
    id: "animation",
    name: "Animation",
    icon: "🎬",
    description: "Keyframe and motion animation tools",
    slug: "animation",
  },
  {
    id: "text",
    name: "Text & Typography",
    icon: "📝",
    description: "Advanced text animation and styling",
    slug: "text",
  },
  {
    id: "transitions",
    name: "Transitions",
    icon: "➡️",
    description: "Transition effects and animations",
    slug: "transitions",
  },
  {
    id: "vfx",
    name: "VFX & Effects",
    icon: "✨",
    description: "Visual effects and special effects",
    slug: "vfx-effects",
  },
  {
    id: "color",
    name: "Color & Grading",
    icon: "🎨",
    description: "Color correction and grading",
    slug: "color-grading",
  },
  {
    id: "audio",
    name: "Audio Tools",
    icon: "🔊",
    description: "Color correction and grading tools",
    slug: "audio-tools",
  },
  {
    id: "workflow",
    name: "Workflow",
    icon: "⚡",
    description: "Productivity and workflow optimization",
    slug: "workflow",
  },
  {
    id: "data",
    name: "Data Driven",
    icon: "📊",
    description: "Data driven design and development",
    slug: "data-driven",
  },
  {
    id: "3d",
    name: "3D Tools",
    icon: "🎲",
    description: "3D modeling and rendering",
    slug: "3d-tools",
  },
  {
    id: "utility",
    name: "Utilities",
    icon: "🔧",
    description: "Utility tools and helpers",
    slug: "utility-tools",
  },
] as const;

export const PLUGINS = [
  {
    id: 1,
    images: [
      "https://marketstorage.b-cdn.net/previews/d99eaf5d-7aeb-47c0-aeeb-a883319ecbf9-UI8%20Mockup%202.png",
      "https://marketstorage.b-cdn.net/previews/4b7f2c6d-84a2-4571-8f09-49a692b64f04-UI8%20Mockup%203.png",
    ],
    name: "Arc: Easy Ease",
    description:
      "Arc: Easy Ease is a plugin for Adobe After Effects that allows you to create easy transitions between clips.",
    creator: "Creative Jim",
    category: "Animation",
    price: 100,
    slug: "arc-easy-ease",
  },
  {
    id: 2,
    name: "Shapes: Path Animation",
    images: [
      "https://marketstorage.b-cdn.net/previews/d99eaf5d-7aeb-47c0-aeeb-a883319ecbf9-UI8%20Mockup%202.png",
      "https://marketstorage.b-cdn.net/previews/4b7f2c6d-84a2-4571-8f09-49a692b64f04-UI8%20Mockup%203.png",
    ],
    description:
      "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
    creator: "Creative John",
    category: "Animation",
    price: 200,
    slug: "shape-path-animation",
  },
  {
    id: 3,
    name: "Shapes: Path Animation",
    images: [
      "https://marketstorage.b-cdn.net/previews/d99eaf5d-7aeb-47c0-aeeb-a883319ecbf9-UI8%20Mockup%202.png",
      "https://marketstorage.b-cdn.net/previews/4b7f2c6d-84a2-4571-8f09-49a692b64f04-UI8%20Mockup%203.png",
    ],
    description:
      "Shapes: Path Animation is a plugin for Adobe After Effects that allows you to create path animations for shapes.",
    creator: "Creative John",
    category: "Animation",
    price: 300,
    slug: "shape-path-animation",
  },
  {
    id: 4,
    name: "VFX & Particles",
    images: [
      "https://marketstorage.b-cdn.net/previews/d99eaf5d-7aeb-47c0-aeeb-a883319ecbf9-UI8%20Mockup%202.png",
      "https://marketstorage.b-cdn.net/previews/4b7f2c6d-84a2-4571-8f09-49a692b64f04-UI8%20Mockup%203.png",
    ],
    description:
      "VFX & Particles is a plugin for Adobe After Effects that allows you to create VFX and particles for your projects.",
    creator: "Creative Jane",
    category: "Animation",
    price: 400,
    slug: "vfx-particles",
  },
] as const;

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const PLATFORM_FEE_PERCENTAGE = 0.15; // 15% commission

export const pricingOptions = [
  { label: "Paid + Free", value: "paid_free" },
  { label: "Paid", value: "paid" },
  { label: "Free", value: "free" },
];

export const sortOptions = [
  { label: "Recent", value: "recent" },
  { label: "Popular", value: "popular" },
];
