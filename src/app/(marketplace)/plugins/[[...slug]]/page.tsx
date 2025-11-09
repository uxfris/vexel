import { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "../../components/breadrumb";

interface PluginPageProps {
  params: { slug: string };
}

export async function generateMetaData({
  params,
}: PluginPageProps): Promise<Metadata> {
  // const plugin = await getPluginBySlug(params.slug)
  // Replace with actual data
  const plugin = {
    title: "Sample Plugin",
    shortDesc: "Amazing After Effects Plugin",
  };

  return {
    title: `${plugin.title} - AE Market`,
    description: plugin.shortDesc,
  };
}
export default async function PluginDetailPage({ params }: PluginPageProps) {
  // Mock data - replace with actual API call
  const plugin = {
    id: "1",
    title: "Smooth Animator Pro",
    slug: params.slug,
    shortDesc: "Create buttery smooth animations with advanced easing controls",
    description: `
  # About Smooth Animator Pro
  
  Transform your After Effects workflow with Smooth Animator Pro - the ultimate tool for creating professional animations with ease.
  
  ## Key Features
  
  - **Advanced Easing Controls**: Choose from 20+ pre-built easing curves or create your own custom curves
  - **Real-time Preview**: See your animations update instantly as you adjust parameters
  - **Batch Processing**: Apply animations to multiple layers simultaneously
  - **Keyframe Assistant**: Intelligent keyframe suggestions based on your animation style
  - **Export Presets**: Save and share your custom animation presets
  
  ## Perfect For
  
  - Motion designers creating kinetic typography
  - Animators working on explainer videos  
  - UI/UX designers prototyping interactions
  - Video editors adding dynamic transitions
  
  ## What's Included
  
  - Main plugin file (.zxp)
  - Comprehensive video tutorials (2+ hours)
  - 50+ animation presets
  - PDF user guide
  - Priority email support
  
  ## System Requirements
  
  - After Effects CC 2019 or later
  - 4GB RAM minimum (8GB recommended)
  - 100MB free disk space
      `,
    price: 49.99,
    thumbnailUrl: "/placeholder-plugin.jpg",
    videoUrl: "https://example.com/demo.mp4",
    demoImages: ["/demo1.jpg", "/demo2.jpg", "/demo3.jpg", "/demo4.jpg"],
    category: "animation",
    tags: ["animation", "easing", "keyframes", "workflow"],
    aeVersions: ["2025", "2024", "2023", "2022"],
    osCompatibility: ["Windows", "macOS"],
    version: "2.1.0",
    fileSize: 25600000, // 25MB
    downloads: 1250,
    views: 8450,
    sales: 892,
    averageRating: 4.8,
    reviewCount: 127,
    published: true,
    featured: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-10-20"),
    creator: {
      id: "creator1",
      name: "John Doe",
      avatar: null,
      bio: "Motion designer with 10+ years of experience. Creator of award-winning plugins.",
      pluginCount: 12,
      totalSales: 5400,
      rating: 4.9,
    },
  };

  if (!plugin) {
    // notFound()
  }

  return (
    <div className="grid md:grid-cols-2">
      <Breadcrumb />
      {/* <Image src={plugin.} alt={""}  /> */}
    </div>
  );
}
