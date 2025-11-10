import { Metadata } from "next";
import Breadcrumb from "../../components/breadcrumb";
import { PluginDetail } from "../components/plugin-detail";
import { notFound } from "next/navigation";
import PluginCard from "../../components/pluginCard";
import { PLUGINS } from "@/lib/utils/constants";
import Divider from "@/components/ui/divider";
import Footer from "../../../../components/ui/footer";
import Sidebar from "../../components/sidebar";

interface PluginPageProps {
  params: Promise<{ slug?: string[] }>;
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
  const { slug } = await params;
  // Mock data - replace with actual API call
  const plugin = {
    id: "1",
    title: "Smooth Animator Pro",
    slug: slug?.[0] ?? "default",
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
    price: 55,
    discount_price: 28,
    thumbnailUrl: "/placeholder-plugin.jpg",
    videoUrl: "https://example.com/demo.mp4",
    demoImages: [
      "https://cfw6.b-cdn.net/previews/818e38a8-0138-4c50-ae7a-753365fbf26d-02_1742766190817.webp",
      "https://cfw6.b-cdn.net/previews/ca7ab7c4-9099-40ba-b13b-0c7883845b89-iphone-frame_1742802503135.webp",
      "https://cfw6.b-cdn.net/previews/84b42ac3-1ed9-45e9-8af9-610f7cb7b090-04_1742766558968_(1).webp",
      "https://cfw6.b-cdn.net/previews/c9c36871-4f8c-45b5-ae08-089d2bcb6461-05_1742766567063.webp",
      "https://cfw6.b-cdn.net/previews/a63baa1f-c295-427f-a622-4e792ed12655-06_1742766575936_(1).jpg",
    ],
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
    notFound();
  }

  return (
    <div className="mt-4 md:mt-0">
      <Breadcrumb />
      <h1 className="md:hidden text-3xl font-bold text-foreground mt-2">
        {plugin.title}
      </h1>
      <p className="md:hidden font-medium text-md text-muted-foreground mt-2 mb-4">
        {plugin.shortDesc}
      </p>
      <PluginDetail plugin={plugin} />
      <div className="mt-10">
        <h4 className="text-xl md:text-2xl font-bold">You may like these</h4>
        <Divider classNames=" mt-2 mb-4 md:mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-15 mb-15">
          {PLUGINS.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
        <Footer />
      </div>
      <Sidebar isMobileOnly={true} />
    </div>
  );
}
