// prisma/seed.ts
import {
  PrismaClient,
  OrderStatus,
  PayoutStatus,
  UserRole,
  PluginStatus,
} from "../src/lib/prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (in reverse order of dependencies)
  await prisma.pluginView.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.review.deleteMany();
  await prisma.licenseKey.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.pluginTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.plugin.deleteMany();
  await prisma.category.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.otp.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Hash password for all users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // ============================================
  // USERS
  // ============================================
  const admin = await prisma.user.create({
    data: {
      email: "admin@aemarketplace.com",
      passwordHash: hashedPassword,
      name: "Admin User",
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      stripeCustomerId: "cus_admin123",
    },
  });

  const buyer1 = await prisma.user.create({
    data: {
      email: "john.buyer@example.com",
      passwordHash: hashedPassword,
      name: "John Buyer",
      role: UserRole.BUYER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      stripeCustomerId: "cus_buyer1",
    },
  });

  const buyer2 = await prisma.user.create({
    data: {
      email: "sarah.buyer@example.com",
      passwordHash: hashedPassword,
      name: "Sarah Buyer",
      role: UserRole.BUYER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      stripeCustomerId: "cus_buyer2",
    },
  });

  const sellerUser1 = await prisma.user.create({
    data: {
      email: "mike.creator@example.com",
      passwordHash: hashedPassword,
      name: "Mike Creator",
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      bio: "Professional motion designer with 10+ years of experience creating After Effects plugins.",
      website: "https://mikecreator.com",
      twitter: "@mikecreator",
      instagram: "@mikecreator",
      stripeCustomerId: "cus_seller1",
      stripeConnectId: "acct_seller1",
      stripeConnectStatus: true,
    },
  });

  const sellerUser2 = await prisma.user.create({
    data: {
      email: "lisa.designer@example.com",
      passwordHash: hashedPassword,
      name: "Lisa Designer",
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      bio: "UI/UX designer specializing in animation tools and workflow optimization.",
      website: "https://lisadesigner.com",
      twitter: "@lisadesigner",
      stripeCustomerId: "cus_seller2",
      stripeConnectId: "acct_seller2",
      stripeConnectStatus: true,
    },
  });

  const sellerUser3 = await prisma.user.create({
    data: {
      email: "alex.dev@example.com",
      passwordHash: hashedPassword,
      name: "Alex Developer",
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      bio: "Full-stack developer and motion graphics enthusiast.",
      website: "https://alexdev.io",
      stripeCustomerId: "cus_seller3",
      stripeConnectId: "acct_seller3",
      stripeConnectStatus: true,
    },
  });

  console.log("✅ Created users");

  // ============================================
  // SELLERS
  // ============================================
  const seller1 = await prisma.seller.create({
    data: {
      name: "Mike Creator Studio",
      slug: "mike-creator-studio",
      bio: "Professional motion designer with 10+ years of experience creating After Effects plugins.",
      website: "https://mikecreator.com",
      twitter: "@mikecreator",
      instagram: "@mikecreator",
      userId: sellerUser1.id,
    },
  });

  const seller2 = await prisma.seller.create({
    data: {
      name: "Lisa Designer Co",
      slug: "lisa-designer-co",
      bio: "UI/UX designer specializing in animation tools and workflow optimization.",
      website: "https://lisadesigner.com",
      twitter: "@lisadesigner",
      userId: sellerUser2.id,
    },
  });

  const seller3 = await prisma.seller.create({
    data: {
      name: "Alex Dev Tools",
      slug: "alex-dev-tools",
      bio: "Full-stack developer and motion graphics enthusiast.",
      website: "https://alexdev.io",
      userId: sellerUser3.id,
    },
  });

  console.log("✅ Created sellers");

  // ============================================
  // CATEGORIES
  // ============================================
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Animation",
        slug: "animation",
        description: "Tools for creating and enhancing animations",
        icon: "🎬",
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Text & Typography",
        slug: "text-typography",
        description: "Text animation and typography tools",
        icon: "✍️",
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Effects",
        slug: "effects",
        description: "Visual effects and filters",
        icon: "✨",
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Color & Grading",
        slug: "color-grading",
        description: "Color correction and grading tools",
        icon: "🎨",
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Utilities",
        slug: "utilities",
        description: "Workflow and productivity tools",
        icon: "⚡",
        order: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "3D & Particles",
        slug: "3d-particles",
        description: "3D rendering and particle systems",
        icon: "✨",
        order: 6,
      },
    }),
  ]);

  console.log("✅ Created categories");

  // ============================================
  // TAGS
  // ============================================
  const tags = await Promise.all([
    prisma.tag.create({
      data: { name: "Motion Graphics", slug: "motion-graphics" },
    }),
    prisma.tag.create({
      data: { name: "Text Animation", slug: "text-animation" },
    }),
    prisma.tag.create({
      data: { name: "Particle Effects", slug: "particle-effects" },
    }),
    prisma.tag.create({
      data: { name: "Color Grading", slug: "color-grading" },
    }),
    prisma.tag.create({ data: { name: "Workflow", slug: "workflow" } }),
    prisma.tag.create({ data: { name: "3D", slug: "3d" } }),
    prisma.tag.create({ data: { name: "Typography", slug: "typography" } }),
    prisma.tag.create({ data: { name: "Transitions", slug: "transitions" } }),
    prisma.tag.create({ data: { name: "Automation", slug: "automation" } }),
    prisma.tag.create({
      data: { name: "Visual Effects", slug: "visual-effects" },
    }),
  ]);

  console.log("✅ Created tags");

  // ============================================
  // PLUGINS
  // ============================================
  const plugin1 = await prisma.plugin.create({
    data: {
      title: "Smooth Animator Pro",
      slug: "smooth-animator-pro",
      description:
        "Create buttery smooth animations with advanced easing curves and motion path controls. Features include customizable velocity graphs, auto-interpolation, and preset libraries for common animation patterns.",
      shortDescription:
        "Advanced animation toolkit with smart easing and motion path controls",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200",
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200",
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1200",
      ],
      price: 49.99,
      discountPrice: 39.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/smooth-animator-pro.zip",
      fileName: "smooth-animator-pro-v1.0.0.zip",
      fileSize: 15728640, // 15MB
      version: "1.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 245,
      viewCount: 1823,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: categories[0].id, // Animation
      publishedAt: new Date("2024-01-15"),
    },
  });

  const plugin2 = await prisma.plugin.create({
    data: {
      title: "Type Master 3000",
      slug: "type-master-3000",
      description:
        "The ultimate text animation plugin with 500+ presets, kinetic typography tools, and advanced character-by-character animation controls. Perfect for creating stunning title sequences and animated text effects.",
      shortDescription: "Professional text animation suite with 500+ presets",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
      ],
      price: 59.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/type-master-3000.zip",
      fileName: "type-master-3000-v2.1.0.zip",
      fileSize: 28311552, // 27MB
      version: "2.1.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 412,
      viewCount: 3241,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: categories[1].id, // Text & Typography
      publishedAt: new Date("2023-11-20"),
    },
  });

  const plugin3 = await prisma.plugin.create({
    data: {
      title: "Particle Universe",
      slug: "particle-universe",
      description:
        "Create stunning particle effects with GPU-accelerated rendering. Includes physics simulations, collision detection, and over 100 particle presets for fire, smoke, magic, and more.",
      shortDescription:
        "GPU-accelerated particle system with physics simulation",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
        "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200",
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200",
      ],
      price: 79.99,
      discountPrice: 69.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/particle-universe.zip",
      fileName: "particle-universe-v1.5.2.zip",
      fileSize: 45088768, // 43MB
      version: "1.5.2",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 189,
      viewCount: 2156,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: categories[5].id, // 3D & Particles
      publishedAt: new Date("2024-02-01"),
    },
  });

  const plugin4 = await prisma.plugin.create({
    data: {
      title: "Color Harmony Suite",
      slug: "color-harmony-suite",
      description:
        "Professional color grading toolkit with LUT support, HSL controls, and AI-powered color matching. Achieve cinematic looks with one-click presets or fine-tune every aspect manually.",
      shortDescription: "Professional color grading with AI-powered matching",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1762652847337-d0bb9764308b?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=1200",
        "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1200",
      ],
      price: 44.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/color-harmony-suite.zip",
      fileName: "color-harmony-suite-v1.2.0.zip",
      fileSize: 12582912, // 12MB
      version: "1.2.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 328,
      viewCount: 2891,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller2.id,
      categoryId: categories[3].id, // Color & Grading
      publishedAt: new Date("2024-01-10"),
    },
  });

  const plugin5 = await prisma.plugin.create({
    data: {
      title: "Workflow Wizard",
      slug: "workflow-wizard",
      description:
        "Supercharge your productivity with automated tasks, batch processing, custom shortcuts, and project organization tools. Save hours on repetitive tasks.",
      shortDescription: "Automation and productivity toolkit for After Effects",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
      ],
      price: 34.99,
      discountPrice: 24.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/workflow-wizard.zip",
      fileName: "workflow-wizard-v2.0.0.zip",
      fileSize: 8388608, // 8MB
      version: "2.0.0",
      aeVersions: ["2021", "2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 567,
      viewCount: 4123,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[4].id, // Utilities
      publishedAt: new Date("2023-12-05"),
    },
  });

  const plugin6 = await prisma.plugin.create({
    data: {
      title: "Glitch Master FX",
      slug: "glitch-master-fx",
      description:
        "Create stunning glitch effects with customizable digital distortion, RGB split, scan lines, and VHS aesthetics. Perfect for modern, edgy video content.",
      shortDescription: "Comprehensive glitch and distortion effects toolkit",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
        "https://images.unsplash.com/photo-1558618666-1a3f2f5c7086?w=1200",
      ],
      price: 39.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/glitch-master-fx.zip",
      fileName: "glitch-master-fx-v1.0.0.zip",
      fileSize: 10485760, // 10MB
      version: "1.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 134,
      viewCount: 1567,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-03-01"),
    },
  });

  const plugin7 = await prisma.plugin.create({
    data: {
      title: "3D Transform Pro",
      slug: "3d-transform-pro",
      description:
        "Advanced 3D transformation tools with camera controls, depth mapping, and realistic shadow generation. Take your 2D compositions into the third dimension.",
      shortDescription: "Professional 3D transformation and camera tools",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200",
      ],
      price: 54.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/3d-transform-pro.zip",
      fileName: "3d-transform-pro-v1.3.0.zip",
      fileSize: 22020096, // 21MB
      version: "1.3.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 98,
      viewCount: 892,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[5].id, // 3D & Particles
      publishedAt: new Date("2024-02-20"),
    },
  });

  const plugin8 = await prisma.plugin.create({
    data: {
      title: "Draft Preview Tool",
      slug: "draft-preview-tool",
      description:
        "A work-in-progress tool for quick previews. Still in development.",
      shortDescription: "Preview tool in development",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      demoGifUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
      images: [],
      price: 19.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/draft-preview-tool.zip",
      fileName: "draft-preview-tool-v0.1.0.zip",
      fileSize: 5242880, // 5MB
      version: "0.1.0",
      aeVersions: ["2024", "2025"],
      operatingSystems: ["Windows"],
      downloadCount: 0,
      viewCount: 45,
      status: PluginStatus.DRAFT,
      featured: false,
      sellerId: seller2.id,
      categoryId: categories[4].id, // Utilities
    },
  });

  const plugin9 = await prisma.plugin.create({
    data: {
      title: "Realtime Keyer Pro",
      slug: "realtime-keyer-pro",
      description:
        "Achieve pixel-perfect chroma keying in real-time. Advanced spill suppression, edge detection, and matte refinement tools make green screen work effortless.",
      shortDescription:
        "Advanced real-time chroma keying and spill suppression",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1549887552-cb102575b0c0?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/l41Yq0CpA9c90ExwY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1574717024637-6176a6e575e1?w=1200",
        "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200",
      ],
      price: 69.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/realtime-keyer-pro.zip",
      fileName: "realtime-keyer-pro-v2.2.0.zip",
      fileSize: 31457280, // 30MB
      version: "2.2.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 310,
      viewCount: 2980,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-01-25"),
    },
  });

  const plugin10 = await prisma.plugin.create({
    data: {
      title: "Auto Layer Manager",
      slug: "auto-layer-manager",
      description:
        "Organize complex projects with one click. Automatically sort, label, color-code, and group layers based on type, name, or custom rules. Includes a powerful layer search tool.",
      shortDescription: "Automatic layer sorting, labeling, and grouping",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1550645612-82f5897e1659?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o6Zt0iG1qT8b9EiwE/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1550751827-4bd38d2f2c8d?w=1200",
      ],
      price: 29.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/auto-layer-manager.zip",
      fileName: "auto-layer-manager-v1.5.0.zip",
      fileSize: 6291456, // 6MB
      version: "1.5.0",
      aeVersions: ["2020", "2021", "2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 812,
      viewCount: 5621,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[4].id, // Utilities
      publishedAt: new Date("2023-10-15"),
    },
  });

  const plugin11 = await prisma.plugin.create({
    data: {
      title: "Neon Glow Generator",
      slug: "neon-glow-generator",
      description:
        "Create realistic neon glows and lighting effects. Customizable flicker, pulse, and color shifting. Works perfectly on text, shapes, and footage.",
      shortDescription: "Realistic and customizable neon light effects",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1531306728370-e2ebd6d7c834?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/l0HlHFRbBBY2l1E1a/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1549490349-8643362247b6?w=1200",
        "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=1200",
      ],
      price: 24.99,
      discountPrice: 19.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/neon-glow-generator.zip",
      fileName: "neon-glow-generator-v1.1.0.zip",
      fileSize: 9437184, // 9MB
      version: "1.1.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 433,
      viewCount: 3102,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller2.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-03-10"),
    },
  });

  const plugin12 = await prisma.plugin.create({
    data: {
      title: "Text Exploder 2",
      slug: "text-exploder-2",
      description:
        "Break text apart into characters, words, or lines for granular animation control. Features advanced physics simulation for disintegration effects.",
      shortDescription: "Break text apart with advanced physics simulations",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o72F4UZLXBbTqG5yM/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?w=1200",
      ],
      price: 39.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/text-exploder-2.zip",
      fileName: "text-exploder-2-v2.0.1.zip",
      fileSize: 18874368, // 18MB
      version: "2.0.1",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 176,
      viewCount: 1432,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[1].id, // Text & Typography
      publishedAt: new Date("2024-02-18"),
    },
  });

  const plugin13 = await prisma.plugin.create({
    data: {
      title: "EZ Rigging Studio",
      slug: "ez-rigging-studio",
      description:
        "Simplify character rigging with intuitive controllers, automatic limb setup, and IK/FK switching. Perfect for both beginners and advanced animators.",
      shortDescription: "Intuitive character rigging with IK/FK controls",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/xT1R9y1n2q5jP0v5Vm/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
        "https://images.unsplash.com/photo-1556761175-59736f6230ba?w=1200",
      ],
      price: 64.99,
      discountPrice: 49.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/ez-rigging-studio.zip",
      fileName: "ez-rigging-studio-v1.8.0.zip",
      fileSize: 26214400, // 25MB
      version: "1.8.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 289,
      viewCount: 2455,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: categories[0].id, // Animation
      publishedAt: new Date("2023-11-30"),
    },
  });

  const plugin14 = await prisma.plugin.create({
    data: {
      title: "Lens Flare Ultimate",
      slug: "lens-flare-ultimate",
      description:
        "Photorealistic lens flares with occlusion detection, lens dirt simulation, and anamorphic presets. All flares are procedurally generated and customizable.",
      shortDescription: "Photorealistic procedural lens flares with occlusion",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o75218EaCj4Fc9aSY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
      ],
      price: 49.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/lens-flare-ultimate.zip",
      fileName: "lens-flare-ultimate-v3.0.0.zip",
      fileSize: 36700160, // 35MB
      version: "3.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 221,
      viewCount: 1987,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-01-20"),
    },
  });

  const plugin15 = await prisma.plugin.create({
    data: {
      title: "Model Importer Pro",
      slug: "model-importer-pro",
      description:
        "Import 3D models (OBJ, FBX, GLTF) directly into After Effects. Supports PBR materials, image-based lighting, and integration with AE cameras and lights.",
      shortDescription: "Import OBJ, FBX, and GLTF models with PBR support",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1593369407131-a83a4c0634b0?w=1200",
        "https://images.unsplash.com/photo-1600132806370-bf17e65e93e0?w=1200",
      ],
      price: 89.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/model-importer-pro.zip",
      fileName: "model-importer-pro-v1.4.0.zip",
      fileSize: 50331648, // 48MB
      version: "1.4.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 155,
      viewCount: 1324,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller3.id,
      categoryId: categories[5].id, // 3D & Particles
      publishedAt: new Date("2024-02-14"),
    },
  });

  const plugin16 = await prisma.plugin.create({
    data: {
      title: "Retro Look Suite",
      slug: "retro-look-suite",
      description:
        "Emulate vintage film looks, VHS tapes, 8-bit games, and more. A complete suite of effects for creating authentic retro and nostalgic aesthetics.",
      shortDescription: "Authentic vintage film, VHS, and 8-bit effects",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511854050215-56c601e30f1d?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o85xvbxf2RkWsD6kE/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1485084335160-c4f5b5f6d819?w=1200",
      ],
      price: 44.99,
      discountPrice: 34.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/retro-look-suite.zip",
      fileName: "retro-look-suite-v1.0.0.zip",
      fileSize: 20971520, // 20MB
      version: "1.0.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 388,
      viewCount: 2765,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller2.id,
      categoryId: categories[3].id, // Color & Grading
      publishedAt: new Date("2024-03-05"),
    },
  });

  const plugin17 = await prisma.plugin.create({
    data: {
      title: "Quick Exporter",
      slug: "quick-exporter",
      description:
        "Export multiple compositions to different formats simultaneously. Create presets for your favorite render settings and destinations. Saves valuable time on large projects.",
      shortDescription: "Batch export multiple comps with render presets",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1526379095098-d400fd0e1431?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/l41m4sZ3LlhPu8P0Q/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1542903660-eedba2cda473?w=1200",
      ],
      price: 19.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/quick-exporter.zip",
      fileName: "quick-exporter-v1.3.0.zip",
      fileSize: 4194304, // 4MB
      version: "1.3.0",
      aeVersions: ["2021", "2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 672,
      viewCount: 4501,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[4].id, // Utilities
      publishedAt: new Date("2023-09-01"),
    },
  });

  const plugin18 = await prisma.plugin.create({
    data: {
      title: "Shape Morph Pro",
      slug: "shape-morph-pro",
      description:
        "Create seamless morphing animations between shape layers. Advanced correspondence point control and auto-matching for complex shape transitions.",
      shortDescription: "Seamless shape layer morphing with auto-matching",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7qE0x0a2PGE1mluo/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200",
        "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1200",
      ],
      price: 34.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/shape-morph-pro.zip",
      fileName: "shape-morph-pro-v1.6.0.zip",
      fileSize: 13631488, // 13MB
      version: "1.6.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 301,
      viewCount: 2234,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[0].id, // Animation
      publishedAt: new Date("2023-12-20"),
    },
  });

  const plugin19 = await prisma.plugin.create({
    data: {
      title: "Audio Visualizer Max",
      slug: "audio-visualizer-max",
      description:
        "Generate dynamic audio visualizations from any audio layer. Includes over 50 unique templates for spectrums, waveforms, and particle responders.",
      shortDescription: "50+ templates for dynamic audio spectrums & waveforms",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o75218EaCj4Fc9aSY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",
        "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?w=1200",
      ],
      price: 49.99,
      discountPrice: 39.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/audio-visualizer-max.zip",
      fileName: "audio-visualizer-max-v2.0.0.zip",
      fileSize: 29360128, // 28MB
      version: "2.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 254,
      viewCount: 1988,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-01-05"),
    },
  });

  const plugin20 = await prisma.plugin.create({
    data: {
      title: "True Motion Blur",
      slug: "true-motion-blur",
      description:
        "A GPU-accelerated motion blur engine that provides photorealistic, camera-accurate motion blur. Far superior to the standard AE motion blur, with fine-tuned controls.",
      shortDescription: "GPU-accelerated, photorealistic motion blur engine",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1508344928822-ac6d281a17ff?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1531514330698-1210963d12c7?w=1200",
      ],
      price: 59.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/true-motion-blur.zip",
      fileName: "true-motion-blur-v1.2.0.zip",
      fileSize: 15728640, // 15MB
      version: "1.2.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 199,
      viewCount: 1675,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[0].id, // Animation
      publishedAt: new Date("2024-03-12"),
    },
  });

  const plugin21 = await prisma.plugin.create({
    data: {
      title: "Typewriter Pro",
      slug: "typewriter-pro",
      description:
        "The most advanced typewriter effect plugin. Control timing, add randomized character offsets, and include cursor animations with realistic sound effects.",
      shortDescription: "Realistic typewriter effect with sound and cursor",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1456306560678-35c0f5f782c3?w=1200",
      ],
      price: 29.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/typewriter-pro.zip",
      fileName: "typewriter-pro-v2.3.0.zip",
      fileSize: 11534336, // 11MB
      version: "2.3.0",
      aeVersions: ["2021", "2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 405,
      viewCount: 3011,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[1].id, // Text & Typography
      publishedAt: new Date("2023-11-10"),
    },
  });

  const plugin22 = await prisma.plugin.create({
    data: {
      title: "Sky Replacer AI",
      slug: "sky-replacer-ai",
      description:
        "Replace skies in your footage with one click. AI-powered masking and lighting adjustment ensures a seamless composite. Includes a library of 50 high-res skies.",
      shortDescription: "One-click AI sky replacement with lighting match",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/l41Yq0CpA9c90ExwY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1470252649378-9c29740c9f40?w=1200",
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200",
      ],
      price: 79.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/sky-replacer-ai.zip",
      fileName: "sky-replacer-ai-v1.0.0.zip",
      fileSize: 52428800, // 50MB (includes sky library)
      version: "1.0.0",
      aeVersions: ["2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 110,
      viewCount: 1024,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: categories[2].id, // Effects
      publishedAt: new Date("2024-04-01"),
    },
  });

  const plugin23 = await prisma.plugin.create({
    data: {
      title: "Skin Smoother Pro",
      slug: "skin-smoother-pro",
      description:
        "High-end skin retouching plugin. Uses frequency separation techniques to smooth skin while preserving natural texture. Simple controls for fast, beautiful results.",
      shortDescription: "Pro skin retouching with frequency separation",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1607604557053-551b033b3b4f?w=1200",
      ],
      price: 49.99,
      discountPrice: 39.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/skin-smoother-pro.zip",
      fileName: "skin-smoother-pro-v1.1.0.zip",
      fileSize: 14680064, // 14MB
      version: "1.1.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 230,
      viewCount: 1845,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller2.id,
      categoryId: categories[3].id, // Color & Grading
      publishedAt: new Date("2024-02-05"),
    },
  });

  const plugin24 = await prisma.plugin.create({
    data: {
      title: "Comp Structure Viewer",
      slug: "comp-structure-viewer",
      description:
        "Visualize your entire project's composition hierarchy in a clean, node-based flowchart. Quickly find dependencies and navigate complex projects.",
      shortDescription:
        "Node-based flowchart for project composition hierarchy",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1547720980-90963b46985a?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200",
      ],
      price: 24.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/comp-structure-viewer.zip",
      fileName: "comp-structure-viewer-v1.0.0.zip",
      fileSize: 7340032, // 7MB
      version: "1.0.0",
      aeVersions: ["2021", "2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 380,
      viewCount: 2409,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[4].id, // Utilities
      publishedAt: new Date("2024-01-30"),
    },
  });

  const plugin25 = await prisma.plugin.create({
    data: {
      title: "Super Repeater",
      slug: "super-repeater",
      description:
        "Create complex repeater animations with advanced controls for position, scale, rotation, and time offset. Go far beyond the standard shape repeater.",
      shortDescription: "Advanced repeater for complex animation patterns",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1510070009289-b5bc34383727?w=1200",
      ],
      price: 39.99,
      discountPrice: 29.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/super-repeater.zip",
      fileName: "super-repeater-v1.5.0.zip",
      fileSize: 12582912, // 12MB
      version: "1.5.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 211,
      viewCount: 1734,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[0].id, // Animation
      publishedAt: new Date("2023-12-10"),
    },
  });

  const plugin26 = await prisma.plugin.create({
    data: {
      title: "Volumetric Fog 3D",
      slug: "volumetric-fog-3d",
      description:
        "Add realistic, procedural volumetric fog and light rays to your 3D scenes. Reacts to AE lights and cameras for dynamic, atmospheric effects.",
      shortDescription:
        "Procedural volumetric fog and light rays for 3D scenes",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1498661705881-600b52118ffb?w=1200",
        "https://images.unsplash.com/photo-1501862700949-a218c2f15326?w=1200",
      ],
      price: 69.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/volumetric-fog-3d.zip",
      fileName: "volumetric-fog-3d-v1.1.0.zip",
      fileSize: 33554432, // 32MB
      version: "1.1.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 162,
      viewCount: 1401,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: categories[5].id, // 3D & Particles
      publishedAt: new Date("2024-03-20"),
    },
  });

  const plugin27 = await prisma.plugin.create({
    data: {
      title: "Handwritten Pro",
      slug: "handwritten-pro",
      description:
        "Simulate realistic handwriting animations from any font or vector path. Controls speed, stroke variation, and includes 20 preset handwriting styles.",
      shortDescription: "Realistic handwriting animation from fonts and paths",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
      ],
      price: 34.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/handwritten-pro.zip",
      fileName: "handwritten-pro-v1.0.0.zip",
      fileSize: 17825792, // 17MB
      version: "1.0.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 290,
      viewCount: 1950,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: categories[1].id, // Text & Typography
      publishedAt: new Date("2024-02-28"),
    },
  });

  const plugin28 = await prisma.plugin.create({
    data: {
      title: "Project Templater",
      slug: "project-templater",
      description:
        "Create and reuse project templates with one click. Automatically builds folder structures, creates common comps, and imports standard assets. (Pending Review)",
      shortDescription: "Create and apply project templates automatically",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demoGifUrl: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1516116216624-53e6973bea12?w=1200",
      ],
      price: 34.99,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/ae-plugins/project-templater.zip",
      fileName: "project-templater-v0.9.0.zip",
      fileSize: 5242880, // 5MB
      version: "0.9.0",
      aeVersions: ["2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 0,
      viewCount: 22,
      status: PluginStatus.ARCHIVED,
      featured: false,
      sellerId: seller1.id,
      categoryId: categories[4].id, // Utilities
    },
  });

  console.log("✅ Created plugins");

  // ============================================
  // PLUGIN TAGS
  // ============================================
  await prisma.pluginTag.createMany({
    data: [
      // Smooth Animator Pro
      { pluginId: plugin1.id, tagId: tags[0].id }, // Motion Graphics
      { pluginId: plugin1.id, tagId: tags[7].id }, // Transitions
      // Type Master 3000
      { pluginId: plugin2.id, tagId: tags[1].id }, // Text Animation
      { pluginId: plugin2.id, tagId: tags[6].id }, // Typography
      { pluginId: plugin2.id, tagId: tags[0].id }, // Motion Graphics
      // Particle Universe
      { pluginId: plugin3.id, tagId: tags[2].id }, // Particle Effects
      { pluginId: plugin3.id, tagId: tags[5].id }, // 3D
      { pluginId: plugin3.id, tagId: tags[9].id }, // Visual Effects
      // Color Harmony Suite
      { pluginId: plugin4.id, tagId: tags[3].id }, // Color Grading
      // Workflow Wizard
      { pluginId: plugin5.id, tagId: tags[4].id }, // Workflow
      { pluginId: plugin5.id, tagId: tags[8].id }, // Automation
      // Glitch Master FX
      { pluginId: plugin6.id, tagId: tags[9].id }, // Visual Effects
      // 3D Transform Pro
      { pluginId: plugin7.id, tagId: tags[5].id }, // 3D
      { pluginId: plugin8.id, tagId: tags[9].id }, // 3D
    ],
  });

  console.log("✅ Created plugin tags");

  // ============================================
  // ORDERS
  // ============================================
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-001",
      buyerId: buyer1.id,
      buyerEmail: buyer1.email,
      stripePaymentIntentId: "pi_3N1234567890",
      status: OrderStatus.COMPLETED,
      subtotal: 89.98,
      tax: 8.1,
      total: 98.08,
      currency: "USD",
      completedAt: new Date("2024-01-20"),
      createdAt: new Date("2024-01-20"),
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-002",
      buyerId: buyer2.id,
      buyerEmail: buyer2.email,
      stripePaymentIntentId: "pi_3N2345678901",
      status: OrderStatus.COMPLETED,
      subtotal: 59.99,
      tax: 5.4,
      total: 65.39,
      currency: "USD",
      completedAt: new Date("2024-02-05"),
      createdAt: new Date("2024-02-05"),
    },
  });

  const order3 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-003",
      buyerId: buyer1.id,
      buyerEmail: buyer1.email,
      stripePaymentIntentId: "pi_3N3456789012",
      status: OrderStatus.COMPLETED,
      subtotal: 69.99,
      tax: 6.3,
      total: 76.29,
      currency: "USD",
      completedAt: new Date("2024-02-15"),
      createdAt: new Date("2024-02-15"),
    },
  });

  const order4 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-004",
      buyerId: buyer2.id,
      buyerEmail: buyer2.email,
      status: OrderStatus.PENDING,
      subtotal: 44.99,
      tax: 4.05,
      total: 49.04,
      currency: "USD",
      createdAt: new Date("2024-03-10"),
    },
  });

  console.log("✅ Created orders");

  // ============================================
  // ORDER ITEMS
  // ============================================
  await prisma.orderItem.createMany({
    data: [
      // Order 1 items
      {
        orderId: order1.id,
        pluginId: plugin1.id,
        pluginTitle: plugin1.title,
        pluginPrice: 39.99,
        sellerEarnings: 35.99, // 90% to seller
        platformFee: 4.0,
      },
      {
        orderId: order1.id,
        pluginId: plugin2.id,
        pluginTitle: plugin2.title,
        pluginPrice: 49.99,
        sellerEarnings: 44.99,
        platformFee: 5.0,
      },
      // Order 2 items
      {
        orderId: order2.id,
        pluginId: plugin2.id,
        pluginTitle: plugin2.title,
        pluginPrice: 59.99,
        sellerEarnings: 53.99,
        platformFee: 6.0,
      },
      // Order 3 items
      {
        orderId: order3.id,
        pluginId: plugin3.id,
        pluginTitle: plugin3.title,
        pluginPrice: 69.99,
        sellerEarnings: 62.99,
        platformFee: 7.0,
      },
      // Order 4 items
      {
        orderId: order4.id,
        pluginId: plugin4.id,
        pluginTitle: plugin4.title,
        pluginPrice: 44.99,
        sellerEarnings: 40.49,
        platformFee: 4.5,
      },
    ],
  });

  console.log("✅ Created order items");

  // ============================================
  // LICENSE KEYS
  // ============================================
  await prisma.licenseKey.createMany({
    data: [
      {
        key: "SMTH-ANIM-PRO1-XXXX-YYYY-ZZZZ",
        orderId: order1.id,
        pluginId: plugin1.id,
        downloadCount: 2,
        maxDownloads: 5,
        lastDownloadAt: new Date("2024-01-21"),
        isActive: true,
      },
      {
        key: "TYPE-MSTR-3000-AAAA-BBBB-CCCC",
        orderId: order1.id,
        pluginId: plugin2.id,
        downloadCount: 1,
        maxDownloads: 5,
        lastDownloadAt: new Date("2024-01-20"),
        isActive: true,
      },
      {
        key: "TYPE-MSTR-3000-DDDD-EEEE-FFFF",
        orderId: order2.id,
        pluginId: plugin2.id,
        downloadCount: 3,
        maxDownloads: 5,
        lastDownloadAt: new Date("2024-02-06"),
        isActive: true,
      },
      {
        key: "PRTC-UNIV-1234-GGGG-HHHH-IIII",
        orderId: order3.id,
        pluginId: plugin3.id,
        downloadCount: 1,
        maxDownloads: 5,
        lastDownloadAt: new Date("2024-02-15"),
        isActive: true,
      },
      {
        key: "COLR-HARM-SUIT-JJJJ-KKKK-LLLL",
        orderId: order4.id,
        pluginId: plugin4.id,
        downloadCount: 0,
        maxDownloads: 5,
        isActive: true,
      },
    ],
  });

  console.log("✅ Created license keys");

  // ============================================
  // REVIEWS
  // ============================================
  await prisma.review.createMany({
    data: [
      {
        pluginId: plugin1.id,
        userId: buyer1.id,
        rating: 5,
        comment:
          "Absolutely love this plugin! The animation curves are so smooth and intuitive. Has saved me countless hours on client projects.",
        isVisible: true,
        createdAt: new Date("2024-01-22"),
      },
      {
        pluginId: plugin1.id,
        userId: buyer2.id,
        rating: 4,
        comment:
          "Great plugin overall. Would be perfect if it had a few more preset options, but the core functionality is excellent.",
        isVisible: true,
        createdAt: new Date("2024-02-10"),
      },
      {
        pluginId: plugin2.id,
        userId: buyer1.id,
        rating: 5,
        comment:
          "Type Master is a game-changer! The text presets are incredible and the customization options are endless. Worth every penny.",
        isVisible: true,
        createdAt: new Date("2024-01-25"),
      },
      {
        pluginId: plugin2.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "Best text animation plugin I've ever used. The kinetic typography tools alone are worth the price.",
        isVisible: true,
        createdAt: new Date("2024-02-07"),
      },
      {
        pluginId: plugin3.id,
        userId: buyer1.id,
        rating: 4,
        comment:
          "Particle Universe creates stunning effects. GPU acceleration works great. Only minor issue is the learning curve for advanced features.",
        isVisible: true,
        createdAt: new Date("2024-02-17"),
      },
      {
        pluginId: plugin4.id,
        userId: buyer1.id,
        rating: 5,
        comment:
          "Color grading has never been easier. The AI matching feature is incredibly accurate.",
        isVisible: true,
        createdAt: new Date("2024-01-15"),
      },
      {
        pluginId: plugin5.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "This plugin literally pays for itself in time saved. The batch processing alone is amazing.",
        isVisible: true,
        createdAt: new Date("2024-02-20"),
      },
      {
        pluginId: plugin5.id,
        userId: buyer1.id,
        rating: 4,
        comment:
          "Very useful for repetitive tasks. Interface could be more intuitive but once you learn it, it's powerful.",
        isVisible: true,
        createdAt: new Date("2024-02-25"),
      },
      {
        pluginId: plugin6.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "Perfect for creating modern, edgy content. The glitch effects look professional and are easy to customize.",
        isVisible: true,
        createdAt: new Date("2024-03-05"),
      },
      {
        pluginId: plugin7.id,
        userId: buyer1.id,
        rating: 4,
        comment:
          "Solid 3D tools. The shadow generation is particularly impressive. Would love to see more camera presets in future updates.",
        isVisible: true,
        createdAt: new Date("2024-02-28"),
      },
    ],
  });

  console.log("✅ Created reviews");

  // ============================================
  // PAYOUTS
  // ============================================
  await prisma.payout.createMany({
    data: [
      {
        sellerId: sellerUser1.id,
        amount: 98.98,
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_1234567890",
        periodStart: new Date("2024-01-01"),
        periodEnd: new Date("2024-01-31"),
        description: "January 2024 earnings",
        paidAt: new Date("2024-02-05"),
        createdAt: new Date("2024-02-01"),
      },
      {
        sellerId: sellerUser2.id,
        amount: 98.98,
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_2345678901",
        periodStart: new Date("2024-01-01"),
        periodEnd: new Date("2024-01-31"),
        description: "January 2024 earnings",
        paidAt: new Date("2024-02-05"),
        createdAt: new Date("2024-02-01"),
      },
      {
        sellerId: sellerUser1.id,
        amount: 62.99,
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_3456789012",
        periodStart: new Date("2024-02-01"),
        periodEnd: new Date("2024-02-29"),
        description: "February 2024 earnings",
        paidAt: new Date("2024-03-05"),
        createdAt: new Date("2024-03-01"),
      },
      {
        sellerId: sellerUser2.id,
        amount: 53.99,
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_4567890123",
        periodStart: new Date("2024-02-01"),
        periodEnd: new Date("2024-02-29"),
        description: "February 2024 earnings",
        paidAt: new Date("2024-03-05"),
        createdAt: new Date("2024-03-01"),
      },
      {
        sellerId: sellerUser3.id,
        amount: 145.75,
        currency: "USD",
        status: PayoutStatus.PROCESSING,
        periodStart: new Date("2024-03-01"),
        periodEnd: new Date("2024-03-31"),
        description: "March 2024 earnings",
        createdAt: new Date("2024-04-01"),
      },
      {
        sellerId: sellerUser1.id,
        amount: 89.5,
        currency: "USD",
        status: PayoutStatus.PENDING,
        periodStart: new Date("2024-04-01"),
        periodEnd: new Date("2024-04-30"),
        description: "April 2024 earnings (pending)",
        createdAt: new Date("2024-05-01"),
      },
    ],
  });

  console.log("✅ Created payouts");

  // ============================================
  // PLUGIN VIEWS (Analytics)
  // ============================================
  const pluginViews = [];
  const plugins = [
    plugin1,
    plugin2,
    plugin3,
    plugin4,
    plugin5,
    plugin6,
    plugin7,
  ];

  // Generate random views for the last 30 days
  for (const plugin of plugins) {
    const viewsToGenerate = Math.floor(Math.random() * 50) + 20; // 20-70 views per plugin

    for (let i = 0; i < viewsToGenerate; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      pluginViews.push({
        pluginId: plugin.id,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        referrer: [
          "https://google.com",
          "https://twitter.com",
          "https://youtube.com",
          null,
        ][Math.floor(Math.random() * 4)],
        country: ["US", "GB", "CA", "AU", "DE", "FR", "JP"][
          Math.floor(Math.random() * 7)
        ],
        createdAt: date,
      });
    }
  }

  await prisma.pluginView.createMany({
    data: pluginViews,
  });

  console.log("✅ Created plugin views");

  // ============================================
  // OTP (For testing email verification)
  // ============================================
  await prisma.otp.create({
    data: {
      email: "test@example.com",
      codehash: await bcrypt.hash("123456", 10),
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      consumed: false,
    },
  });

  console.log("✅ Created OTP records");

  // ============================================
  // SUMMARY
  // ============================================
  const summary = {
    users: await prisma.user.count(),
    sellers: await prisma.seller.count(),
    categories: await prisma.category.count(),
    tags: await prisma.tag.count(),
    plugins: await prisma.plugin.count(),
    orders: await prisma.order.count(),
    orderItems: await prisma.orderItem.count(),
    licenseKeys: await prisma.licenseKey.count(),
    reviews: await prisma.review.count(),
    payouts: await prisma.payout.count(),
    pluginViews: await prisma.pluginView.count(),
  };

  console.log("\n✨ Database seeding completed successfully!\n");
  console.log("📊 Summary:");
  console.log("─".repeat(40));
  Object.entries(summary).forEach(([key, value]) => {
    console.log(`${key.padEnd(20)}: ${value}`);
  });
  console.log("─".repeat(40));
  console.log("\n🔑 Test credentials:");
  console.log("─".repeat(40));
  console.log("Admin:  admin@aemarketplace.com");
  console.log("Buyer:  john.buyer@example.com");
  console.log("Buyer:  sarah.buyer@example.com");
  console.log("Seller: mike.creator@example.com");
  console.log("Seller: lisa.designer@example.com");
  console.log("Seller: alex.dev@example.com");
  console.log("\nPassword for all: password123");
  console.log("─".repeat(40));
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
