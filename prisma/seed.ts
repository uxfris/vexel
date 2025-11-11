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
