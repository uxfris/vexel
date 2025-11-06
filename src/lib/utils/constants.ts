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
  { id: "animation", name: "Animation", icon: "🎬" },
  { id: "text", name: "Text & Typography", icon: "📝" },
  { id: "transitions", name: "Transitions", icon: "➡️" },
  { id: "vfx", name: "VFX & Effects", icon: "✨" },
  { id: "color", name: "Color & Grading", icon: "🎨" },
  { id: "audio", name: "Audio Tools", icon: "🔊" },
  { id: "workflow", name: "Workflow", icon: "⚡" },
  { id: "data", name: "Data Driven", icon: "📊" },
  { id: "3d", name: "3D Tools", icon: "🎲" },
  { id: "utility", name: "Utilities", icon: "🔧" },
] as const;

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const PLATFORM_FEE_PERCENTAGE = 0.15; // 15% commission
