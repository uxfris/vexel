// prisma/seed.ts
import "dotenv/config";
import {
  PrismaClient,
  UserRole,
  PluginStatus,
  OrderStatus,
  PayoutStatus,
} from "@/lib/prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.pluginView.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.review.deleteMany();
  await prisma.licenseKey.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.pluginTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.plugin.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.oTP.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ============================================
  // CREATE USERS
  // ============================================
  console.log("👥 Creating users...");

  const passwordHash = await hash("password123", 12);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@aeplugins.com",
      name: "Admin User",
      passwordHash,
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
  });

  const buyer1 = await prisma.user.create({
    data: {
      email: "buyer1@example.com",
      name: "John Doe",
      passwordHash,
      role: UserRole.BUYER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      stripeCustomerId: "cus_buyer1_test",
    },
  });

  const buyer2 = await prisma.user.create({
    data: {
      email: "buyer2@example.com",
      name: "Jane Smith",
      passwordHash,
      role: UserRole.BUYER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      stripeCustomerId: "cus_buyer2_test",
    },
  });

  // Seller users
  const sellerUser1 = await prisma.user.create({
    data: {
      email: "motion@master.com",
      name: "Motion Master Studios",
      passwordHash,
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=motion",
      bio: "Professional motion graphics tools for After Effects. Over 10 years of experience creating industry-leading plugins.",
      website: "https://motionmaster.com",
      twitter: "@motionmaster",
      instagram: "@motionmasterstudios",
      stripeCustomerId: "cus_seller1_test",
      stripeConnectId: "acct_seller1_test",
      stripeConnectStatus: true,
    },
  });

  const sellerUser2 = await prisma.user.create({
    data: {
      email: "fx@wizard.com",
      name: "FX Wizard",
      passwordHash,
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wizard",
      bio: "Specialized in particle systems and advanced effects for motion designers.",
      website: "https://fxwizard.com",
      twitter: "@fxwizard",
      stripeCustomerId: "cus_seller2_test",
      stripeConnectId: "acct_seller2_test",
      stripeConnectStatus: true,
    },
  });

  const sellerUser3 = await prisma.user.create({
    data: {
      email: "creative@tools.com",
      name: "Creative Tools Co",
      passwordHash,
      role: UserRole.SELLER,
      emailVerified: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creative",
      bio: "Essential utilities and workflow enhancers for everyday After Effects work.",
      website: "https://creativetools.co",
      instagram: "@creativetoolsco",
      stripeCustomerId: "cus_seller3_test",
      stripeConnectId: "acct_seller3_test",
      stripeConnectStatus: true,
    },
  });

  // ============================================
  // CREATE SELLERS
  // ============================================
  console.log("🏪 Creating sellers...");

  const seller1 = await prisma.seller.create({
    data: {
      name: "Motion Master Studios",
      slug: "motion-master-studios",
      bio: "Professional motion graphics tools for After Effects. Over 10 years of experience creating industry-leading plugins.",
      website: "https://motionmaster.com",
      twitter: "@motionmaster",
      instagram: "@motionmasterstudios",
      userId: sellerUser1.id,
    },
  });

  const seller2 = await prisma.seller.create({
    data: {
      name: "FX Wizard",
      slug: "fx-wizard",
      bio: "Specialized in particle systems and advanced effects for motion designers.",
      website: "https://fxwizard.com",
      twitter: "@fxwizard",
      userId: sellerUser2.id,
    },
  });

  const seller3 = await prisma.seller.create({
    data: {
      name: "Creative Tools Co",
      slug: "creative-tools-co",
      bio: "Essential utilities and workflow enhancers for everyday After Effects work.",
      website: "https://creativetools.co",
      instagram: "@creativetoolsco",
      userId: sellerUser3.id,
    },
  });

  // ============================================
  // CREATE CATEGORIES & SUBCATEGORIES
  // ============================================
  console.log("📁 Creating categories...");

  const animationCategory = await prisma.category.create({
    data: {
      name: "Animation",
      slug: "animation",
      description:
        "Tools for character animation, motion paths, and keyframe utilities",
      icon: "animation",
      order: 1,
      subcategories: {
        create: [
          {
            name: "Character Animation",
            slug: "character-animation",
            order: 1,
          },
          { name: "Motion Paths", slug: "motion-paths", order: 2 },
          { name: "Easing & Timing", slug: "easing-timing", order: 3 },
        ],
      },
    },
  });

  const effectsCategory = await prisma.category.create({
    data: {
      name: "Effects",
      slug: "effects",
      description: "Visual effects, particles, and stylization tools",
      icon: "sparkles",
      order: 2,
      subcategories: {
        create: [
          { name: "Particles", slug: "particles", order: 1 },
          { name: "Color Grading", slug: "color-grading", order: 2 },
          { name: "Lighting", slug: "lighting", order: 3 },
        ],
      },
    },
  });

  const utilitiesCategory = await prisma.category.create({
    data: {
      name: "Utilities",
      slug: "utilities",
      description: "Workflow tools and productivity enhancers",
      icon: "wrench",
      order: 3,
      subcategories: {
        create: [
          { name: "Layer Management", slug: "layer-management", order: 1 },
          { name: "Expressions", slug: "expressions", order: 2 },
          { name: "Export Tools", slug: "export-tools", order: 3 },
        ],
      },
    },
  });

  const textCategory = await prisma.category.create({
    data: {
      name: "Text & Typography",
      slug: "text-typography",
      description: "Text animation and typography tools",
      icon: "type",
      order: 4,
      subcategories: {
        create: [
          { name: "Text Animators", slug: "text-animators", order: 1 },
          { name: "Typewriter Effects", slug: "typewriter-effects", order: 2 },
        ],
      },
    },
  });

  const threeDCategory = await prisma.category.create({
    data: {
      name: "3D Tools",
      slug: "3d-tools",
      description: "3D layer manipulation and camera tools",
      icon: "box",
      order: 5,
      subcategories: {
        create: [
          { name: "Camera Tools", slug: "camera-tools", order: 1 },
          { name: "3D Extrusion", slug: "3d-extrusion", order: 2 },
        ],
      },
    },
  });

  // ============================================
  // CREATE TAGS
  // ============================================
  console.log("🏷️  Creating tags...");

  const tags = await Promise.all([
    prisma.tag.create({
      data: { name: "Motion Graphics", slug: "motion-graphics" },
    }),
    prisma.tag.create({ data: { name: "VFX", slug: "vfx" } }),
    prisma.tag.create({ data: { name: "Workflow", slug: "workflow" } }),
    prisma.tag.create({ data: { name: "Animation", slug: "animation" } }),
    prisma.tag.create({ data: { name: "Particles", slug: "particles" } }),
    prisma.tag.create({ data: { name: "Color", slug: "color" } }),
    prisma.tag.create({ data: { name: "Text", slug: "text" } }),
    prisma.tag.create({ data: { name: "3D", slug: "3d" } }),
    prisma.tag.create({ data: { name: "Time Saver", slug: "time-saver" } }),
    prisma.tag.create({ data: { name: "Essential", slug: "essential" } }),
  ]);

  // ============================================
  // CREATE PLUGINS
  // ============================================
  console.log("🔌 Creating plugins...");

  const animationSubcategories = await prisma.subcategory.findMany({
    where: { categoryId: animationCategory.id },
  });

  const effectsSubcategories = await prisma.subcategory.findMany({
    where: { categoryId: effectsCategory.id },
  });

  const utilitiesSubcategories = await prisma.subcategory.findMany({
    where: { categoryId: utilitiesCategory.id },
  });

  const plugin1 = await prisma.plugin.create({
    data: {
      title: "Motion Flow Pro",
      slug: "motion-flow-pro",
      description: `Motion Flow Pro is the ultimate animation toolkit for After Effects. Create stunning, smooth animations with our advanced easing engine and motion path tools.

Features:
• Advanced bezier curve editor
• 50+ pre-built easing presets
• Motion path visualization
• Keyframe assistant with AI suggestions
• Real-time preview
• Batch apply to multiple layers

Perfect for motion designers who want to speed up their workflow and create professional animations in minutes instead of hours.`,
      shortDescription:
        "Advanced animation toolkit with easing presets and motion path tools",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/example1",
      demoGifUrl: "https://media.giphy.com/media/example1/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
        "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=1200&q=80",
      ],
      price: 0,
      discountPrice: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/plugins/motion-flow-pro-v1.0.0.zip",
      fileName: "motion-flow-pro-v1.0.0.zip",
      fileSize: 15728640, // 15 MB
      version: "1.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 1247,
      viewCount: 5632,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: animationCategory.id,
      subcategoryId: animationSubcategories[2]?.id,
      publishedAt: new Date("2024-01-15"),
      tags: {
        create: [
          { tagId: tags[0].id },
          { tagId: tags[3].id },
          { tagId: tags[8].id },
        ],
      },
    },
  });

  const plugin2 = await prisma.plugin.create({
    data: {
      title: "Particle Universe",
      slug: "particle-universe",
      description: `Create breathtaking particle effects with Particle Universe. From fire and smoke to abstract designs, this plugin handles it all.

Features:
• GPU-accelerated rendering
• 100+ particle presets
• Physics simulation engine
• Custom particle shapes
• Interactive controls
• Export as motion graphics templates

Used by top studios worldwide for commercials, films, and music videos.`,
      shortDescription:
        "Professional particle system with GPU acceleration and physics",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/example2",
      demoGifUrl: "https://media.giphy.com/media/example2/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
      ],
      price: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/plugins/particle-universe-v2.1.0.zip",
      fileName: "particle-universe-v2.1.0.zip",
      fileSize: 31457280, // 30 MB
      version: "2.1.0",
      aeVersions: ["2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 892,
      viewCount: 3421,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: effectsCategory.id,
      subcategoryId: effectsSubcategories[0]?.id,
      publishedAt: new Date("2024-02-20"),
      tags: {
        create: [
          { tagId: tags[1].id },
          { tagId: tags[4].id },
          { tagId: tags[0].id },
        ],
      },
    },
  });

  const plugin3 = await prisma.plugin.create({
    data: {
      title: "Layer Manager Pro",
      slug: "layer-manager-pro",
      description: `Tired of messy timelines? Layer Manager Pro brings order to chaos with intelligent layer organization and management tools.

Features:
• Auto-organize layers by type
• Batch rename with patterns
• Color-coding system
• Layer search and filter
• Quick navigation
• Project cleanup tools
• Custom presets

A must-have for every After Effects user working on complex projects.`,
      shortDescription: "Intelligent layer organization and management toolkit",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/example3",
      demoGifUrl: "https://media.giphy.com/media/example3/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
      ],
      price: 0,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/plugins/layer-manager-pro-v1.2.0.zip",
      fileName: "layer-manager-pro-v1.2.0.zip",
      fileSize: 5242880, // 5 MB
      version: "1.2.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 2156,
      viewCount: 7843,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: utilitiesCategory.id,
      subcategoryId: utilitiesSubcategories[0]?.id,
      publishedAt: new Date("2023-11-10"),
      tags: {
        create: [
          { tagId: tags[2].id },
          { tagId: tags[8].id },
          { tagId: tags[9].id },
        ],
      },
    },
  });

  const plugin4 = await prisma.plugin.create({
    data: {
      title: "Color Harmony Suite",
      slug: "color-harmony-suite",
      description: `Professional color grading and correction tools for After Effects. Achieve cinematic looks with ease.

Features:
• LUT support
• HSL curves
• Color wheels
• Selective color adjustments
• Preset library with 200+ looks
• Before/after comparison
• Export your own LUTs`,
      shortDescription:
        "Professional color grading with LUT support and presets",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      demoGifUrl: "https://media.giphy.com/media/example4/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80",
      ],
      price: 59.99,
      discountPrice: 49.99,
      currency: "USD",
      fileUrl:
        "https://s3.amazonaws.com/plugins/color-harmony-suite-v1.5.0.zip",
      fileName: "color-harmony-suite-v1.5.0.zip",
      fileSize: 20971520, // 20 MB
      version: "1.5.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 643,
      viewCount: 2891,
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: effectsCategory.id,
      subcategoryId: effectsSubcategories[1]?.id,
      publishedAt: new Date("2024-03-05"),
      tags: {
        create: [{ tagId: tags[5].id }, { tagId: tags[1].id }],
      },
    },
  });

  const plugin5 = await prisma.plugin.create({
    data: {
      title: "Text Animator Studio",
      slug: "text-animator-studio",
      description: `Create stunning text animations with hundreds of presets and customization options.

Features:
• 300+ text animation presets
• Typewriter effects
• Glitch effects
• Kinetic typography tools
• Per-character animation
• Export as text animators`,
      shortDescription: "Text animation presets and kinetic typography tools",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80",
      demoGifUrl: "https://media.giphy.com/media/example5/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&q=80",
      ],
      price: 39.99,
      currency: "USD",
      fileUrl:
        "https://s3.amazonaws.com/plugins/text-animator-studio-v1.0.0.zip",
      fileName: "text-animator-studio-v1.0.0.zip",
      fileSize: 12582912, // 12 MB
      version: "1.0.0",
      aeVersions: ["2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 478,
      viewCount: 1923,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller1.id,
      categoryId: textCategory.id,
      publishedAt: new Date("2024-04-12"),
      tags: {
        create: [{ tagId: tags[6].id }, { tagId: tags[3].id }],
      },
    },
  });

  const plugin6 = await prisma.plugin.create({
    data: {
      title: "3D Camera Tools",
      slug: "3d-camera-tools",
      description: `Advanced 3D camera manipulation and animation tools for After Effects.

Features:
• Camera rig presets
• Dolly zoom effects
• Focus pulling tools
• Depth of field controls
• 3D path animation`,
      shortDescription: "Advanced 3D camera controls and animation tools",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
      demoGifUrl: "https://media.giphy.com/media/example6/giphy.gif",
      images: [
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
      ],
      price: 44.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/plugins/3d-camera-tools-v1.1.0.zip",
      fileName: "3d-camera-tools-v1.1.0.zip",
      fileSize: 8388608, // 8 MB
      version: "1.1.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      downloadCount: 321,
      viewCount: 1456,
      status: PluginStatus.PUBLISHED,
      featured: false,
      sellerId: seller3.id,
      categoryId: threeDCategory.id,
      publishedAt: new Date("2024-05-01"),
      tags: {
        create: [{ tagId: tags[7].id }, { tagId: tags[0].id }],
      },
    },
  });

  // Draft plugin (not published)
  await prisma.plugin.create({
    data: {
      title: "Expression Helper (Coming Soon)",
      slug: "expression-helper",
      description: "AI-powered expression builder and debugger. Coming soon!",
      shortDescription: "AI-powered expression builder (Coming Soon)",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      demoGifUrl: "https://media.giphy.com/media/example7/giphy.gif",
      images: [],
      price: 34.99,
      currency: "USD",
      fileUrl: "https://s3.amazonaws.com/plugins/expression-helper-v0.9.0.zip",
      fileName: "expression-helper-v0.9.0.zip",
      fileSize: 4194304,
      version: "0.9.0",
      aeVersions: ["2025"],
      operatingSystems: ["Windows", "macOS"],
      status: PluginStatus.DRAFT,
      sellerId: seller3.id,
      categoryId: utilitiesCategory.id,
    },
  });

  // ============================================
  // CREATE ORDERS
  // ============================================
  console.log("🛒 Creating orders...");

  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-001",
      buyerId: buyer1.id,
      buyerEmail: buyer1.email,
      stripePaymentIntentId: "pi_test_order1",
      status: OrderStatus.COMPLETED,
      subtotal: 89.98,
      tax: 8.1,
      total: 98.08,
      currency: "USD",
      completedAt: new Date("2024-10-15T14:30:00"),
      items: {
        create: [
          {
            pluginId: plugin1.id,
            pluginTitle: plugin1.title,
            pluginPrice: 39.99,
            sellerEarnings: 33.99, // After 15% platform fee
            platformFee: 6.0,
          },
          {
            pluginId: plugin2.id,
            pluginTitle: plugin2.title,
            pluginPrice: 79.99,
            sellerEarnings: 67.99,
            platformFee: 12.0,
          },
        ],
      },
      licenseKeys: {
        create: [
          {
            key: "MFPRO-" + generateLicenseKey(),
            pluginId: plugin1.id,
            downloadCount: 2,
            lastDownloadAt: new Date("2024-10-15T15:00:00"),
          },
          {
            key: "PUNI-" + generateLicenseKey(),
            pluginId: plugin2.id,
            downloadCount: 1,
            lastDownloadAt: new Date("2024-10-15T15:05:00"),
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-002",
      buyerId: buyer2.id,
      buyerEmail: buyer2.email,
      stripePaymentIntentId: "pi_test_order2",
      status: OrderStatus.COMPLETED,
      subtotal: 29.99,
      tax: 2.7,
      total: 32.69,
      currency: "USD",
      completedAt: new Date("2024-10-20T09:15:00"),
      items: {
        create: [
          {
            pluginId: plugin3.id,
            pluginTitle: plugin3.title,
            pluginPrice: 29.99,
            sellerEarnings: 25.49,
            platformFee: 4.5,
          },
        ],
      },
      licenseKeys: {
        create: [
          {
            key: "LMPRO-" + generateLicenseKey(),
            pluginId: plugin3.id,
            downloadCount: 3,
            lastDownloadAt: new Date("2024-10-20T10:00:00"),
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-003",
      buyerId: buyer1.id,
      buyerEmail: buyer1.email,
      stripePaymentIntentId: "pi_test_order3",
      status: OrderStatus.COMPLETED,
      subtotal: 49.99,
      tax: 4.5,
      total: 54.49,
      currency: "USD",
      completedAt: new Date("2024-11-01T16:45:00"),
      items: {
        create: [
          {
            pluginId: plugin4.id,
            pluginTitle: plugin4.title,
            pluginPrice: 49.99,
            sellerEarnings: 42.49,
            platformFee: 7.5,
          },
        ],
      },
      licenseKeys: {
        create: [
          {
            key: "CHSUI-" + generateLicenseKey(),
            pluginId: plugin4.id,
            downloadCount: 0,
          },
        ],
      },
    },
  });

  // Pending order
  await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-004",
      buyerId: buyer2.id,
      buyerEmail: buyer2.email,
      stripePaymentIntentId: "pi_test_pending",
      status: OrderStatus.PENDING,
      subtotal: 39.99,
      tax: 3.6,
      total: 43.59,
      currency: "USD",
      items: {
        create: [
          {
            pluginId: plugin5.id,
            pluginTitle: plugin5.title,
            pluginPrice: 39.99,
            sellerEarnings: 33.99,
            platformFee: 6.0,
          },
        ],
      },
    },
  });

  // ============================================
  // CREATE REVIEWS
  // ============================================
  console.log("⭐ Creating reviews...");

  await prisma.review.createMany({
    data: [
      {
        pluginId: plugin1.id,
        userId: buyer1.id,
        rating: 5,
        comment:
          "Absolutely love this plugin! The easing presets saved me hours of work. The interface is intuitive and the results are professional. Worth every penny!",
      },
      {
        pluginId: plugin1.id,
        userId: buyer2.id,
        rating: 4,
        comment:
          "Great plugin with lots of features. Would be 5 stars if it had more documentation for advanced features.",
      },
      {
        pluginId: plugin2.id,
        userId: buyer1.id,
        rating: 5,
        comment:
          "The particle system is incredible! GPU acceleration makes it super fast. This is now my go-to for all particle work.",
      },
      {
        pluginId: plugin3.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "This plugin is a lifesaver for large projects. The batch rename feature alone is worth the price. Highly recommended!",
      },
      {
        pluginId: plugin3.id,
        userId: buyer1.id,
        rating: 4,
        comment:
          "Very useful utility. Makes organizing layers so much easier. A few minor bugs but overall great.",
      },
      {
        pluginId: plugin4.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "The color grading presets are fantastic. LUT support works flawlessly. Professional quality results.",
      },
      {
        pluginId: plugin2.id,
        userId: buyer2.id,
        rating: 5,
        comment:
          "Mind-blowing particle effects! The physics engine is super realistic. Best particle plugin for AE hands down.",
      },
    ],
  });

  // ============================================
  // CREATE PAYOUTS
  // ============================================
  console.log("💰 Creating payouts...");

  await prisma.payout.createMany({
    data: [
      {
        sellerId: sellerUser1.id,
        amount: 67.98, // From plugin1 sales
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_test_seller1_oct",
        periodStart: new Date("2024-10-01"),
        periodEnd: new Date("2024-10-31"),
        description: "October 2024 earnings",
        paidAt: new Date("2024-11-05"),
      },
      {
        sellerId: sellerUser2.id,
        amount: 110.48, // From plugin2 and plugin4 sales
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_test_seller2_oct",
        periodStart: new Date("2024-10-01"),
        periodEnd: new Date("2024-10-31"),
        description: "October 2024 earnings",
        paidAt: new Date("2024-11-05"),
      },
      {
        sellerId: sellerUser3.id,
        amount: 25.49, // From plugin3 sales
        currency: "USD",
        status: PayoutStatus.PAID,
        stripePayoutId: "po_test_seller3_oct",
        periodStart: new Date("2024-10-01"),
        periodEnd: new Date("2024-10-31"),
        description: "October 2024 earnings",
        paidAt: new Date("2024-11-05"),
      },
      {
        sellerId: sellerUser1.id,
        amount: 0,
        currency: "USD",
        status: PayoutStatus.PENDING,
        periodStart: new Date("2024-11-01"),
        periodEnd: new Date("2024-11-30"),
        description: "November 2024 earnings (pending)",
      },
      {
        sellerId: sellerUser2.id,
        amount: 42.49,
        currency: "USD",
        status: PayoutStatus.PROCESSING,
        stripePayoutId: "po_test_seller2_nov",
        periodStart: new Date("2024-11-01"),
        periodEnd: new Date("2024-11-30"),
        description: "November 2024 earnings (processing)",
      },
    ],
  });

  // ============================================
  // CREATE PLUGIN VIEWS (Analytics)
  // ============================================
  console.log("📊 Creating plugin views...");

  const viewsData: Array<{
    pluginId: string;
    ipAddress: string;
    userAgent: string;
    referrer: string;
    country: string;
    createdAt: Date;
  }> = [];
  const plugins = [plugin1, plugin2, plugin3, plugin4, plugin5, plugin6];

  // Generate views for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    plugins.forEach((plugin) => {
      const viewCount = Math.floor(Math.random() * 50) + 10; // 10-60 views per day

      for (let j = 0; j < viewCount; j++) {
        viewsData.push({
          pluginId: plugin.id,
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          referrer:
            Math.random() > 0.5 ? "https://google.com" : "https://twitter.com",
          country: ["US", "UK", "CA", "AU", "DE", "FR"][
            Math.floor(Math.random() * 6)
          ],
          createdAt: new Date(date.getTime() + j * 60000), // Spread throughout the day
        });
      }
    });
  }

  // Create views in batches to avoid overwhelming the database
  const batchSize = 500;
  for (let i = 0; i < viewsData.length; i += batchSize) {
    await prisma.pluginView.createMany({
      data: viewsData.slice(i, i + batchSize),
    });
  }

  // ============================================
  // CREATE SESSIONS & ACCOUNTS (Optional OAuth)
  // ============================================
  console.log("🔐 Creating sessions...");

  await prisma.session.create({
    data: {
      sessionToken: "session_buyer1_token",
      userId: buyer1.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  await prisma.session.create({
    data: {
      sessionToken: "session_seller1_token",
      userId: sellerUser1.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // ============================================
  // CREATE OTP (For testing email verification)
  // ============================================
  console.log("📧 Creating test OTP...");

  await prisma.oTP.create({
    data: {
      email: "test@example.com",
      hashedCode: await hash("123456", 12),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  // ============================================
  // SUMMARY
  // ============================================
  console.log("\n✅ Seed completed successfully!\n");

  const stats = {
    users: await prisma.user.count(),
    sellers: await prisma.seller.count(),
    categories: await prisma.category.count(),
    subcategories: await prisma.subcategory.count(),
    tags: await prisma.tag.count(),
    plugins: await prisma.plugin.count(),
    orders: await prisma.order.count(),
    reviews: await prisma.review.count(),
    payouts: await prisma.payout.count(),
    licenseKeys: await prisma.licenseKey.count(),
    pluginViews: await prisma.pluginView.count(),
  };

  console.log("📈 Database Statistics:");
  console.log("─".repeat(40));
  Object.entries(stats).forEach(([key, value]) => {
    console.log(`${key.padEnd(20)}: ${value}`);
  });
  console.log("─".repeat(40));

  console.log("\n👤 Test Accounts:");
  console.log("─".repeat(40));
  console.log("Admin:");
  console.log("  Email: admin@aeplugins.com");
  console.log("  Password: password123");
  console.log("\nBuyers:");
  console.log("  Email: buyer1@example.com");
  console.log("  Password: password123");
  console.log("  Email: buyer2@example.com");
  console.log("  Password: password123");
  console.log("\nSellers:");
  console.log("  Email: motion@master.com");
  console.log("  Password: password123");
  console.log("  Email: fx@wizard.com");
  console.log("  Password: password123");
  console.log("  Email: creative@tools.com");
  console.log("  Password: password123");
  console.log("─".repeat(40));
  console.log("\n🎉 You can now start your application!\n");
}

// Helper function to generate license keys
function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = 4;
  const segmentLength = 4;

  const key = [];
  for (let i = 0; i < segments; i++) {
    let segment = "";
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key.push(segment);
  }

  return key.join("-");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
