// prisma/seed.ts

import { PrismaClient, UserRole, PluginStatus } from "../src/lib/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Animation",
        slug: "animation",
        description: "Keyframe and motion animation tools",
        icon: "🎬",
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Text & Typography",
        slug: "text-typography",
        description: "Advanced text animation and styling",
        icon: "✍️",
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "VFX & Particles",
        slug: "vfx-particles",
        description: "Visual effects and particle systems",
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
        name: "Workflow",
        slug: "workflow",
        description: "Productivity and workflow optimization",
        icon: "⚡",
        order: 5,
      },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: { name: "Motion Graphics", slug: "motion-graphics" },
    }),
    prisma.tag.create({ data: { name: "3D", slug: "3d" } }),
    prisma.tag.create({ data: { name: "Automation", slug: "automation" } }),
    prisma.tag.create({
      data: { name: "Beginner Friendly", slug: "beginner-friendly" },
    }),
    prisma.tag.create({ data: { name: "Free Updates", slug: "free-updates" } }),
  ]);

  // Create demo users
  const passwordHash = await bcrypt.hash("password123", 10);

  const buyer = await prisma.user.create({
    data: {
      email: "buyer@example.com",
      emailVerified: new Date(),
      passwordHash,
      name: "John Buyer",
      role: UserRole.BUYER,
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: "seller1@example.com",
      emailVerified: new Date(),
      passwordHash,
      name: "Sarah Creator",
      role: UserRole.SELLER,
      bio: "Motion designer with 10+ years of experience creating AE plugins",
      website: "https://sarahcreator.com",
      twitter: "@sarahcreator",
      stripeConnectStatus: true,
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: "seller2@example.com",
      emailVerified: new Date(),
      passwordHash,
      name: "Mike Developer",
      role: UserRole.SELLER,
      bio: "Full-stack developer specializing in After Effects scripting",
      website: "https://mikedev.io",
      stripeConnectStatus: true,
    },
  });

  // Create demo plugins
  await prisma.plugin.create({
    data: {
      title: "Motion Paths Pro",
      slug: "motion-paths-pro",
      description: `Advanced motion path animation tool that makes creating complex paths intuitive and fast.

Features:
- Bezier curve editor with live preview
- 50+ preset motion paths
- Easing presets and custom curves
- Export paths as shape layers
- Batch apply to multiple layers

Perfect for motion graphics artists who need precise control over animation paths.`,
      shortDescription: "Advanced motion path animation with 50+ presets",
      thumbnailUrl:
        "https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Motion+Paths+Pro",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      price: 49.99,
      fileUrl: "plugins/motion-paths-pro-v1.0.0.zxp",
      fileName: "MotionPathsPro_v1.0.0.zxp",
      fileSize: 2457600,
      version: "1.0.0",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller1.id,
      categoryId: categories[0].id,
      publishedAt: new Date(),
      tags: {
        create: [
          { tag: { connect: { id: tags[0].id } } },
          { tag: { connect: { id: tags[4].id } } },
        ],
      },
    },
  });

  await prisma.plugin.create({
    data: {
      title: "Type Animator",
      slug: "type-animator",
      description: `Create stunning text animations with one click.

Features:
- 100+ animation presets
- Character, word, and line-level control
- Custom timing and easing
- Randomization options
- Save custom presets

The fastest way to bring your typography to life.`,
      shortDescription:
        "100+ text animation presets with custom timing control",
      thumbnailUrl:
        "https://via.placeholder.com/800x600/10B981/FFFFFF?text=Type+Animator",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      price: 29.99,
      fileUrl: "plugins/type-animator-v2.1.0.zxp",
      fileName: "TypeAnimator_v2.1.0.zxp",
      fileSize: 1843200,
      version: "2.1.0",
      aeVersions: ["2022", "2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      status: PluginStatus.PUBLISHED,
      featured: true,
      sellerId: seller2.id,
      categoryId: categories[1].id,
      publishedAt: new Date(),
      tags: {
        create: [
          { tag: { connect: { id: tags[0].id } } },
          { tag: { connect: { id: tags[3].id } } },
        ],
      },
    },
  });

  await prisma.plugin.create({
    data: {
      title: "Quick Exporter",
      slug: "quick-exporter",
      description: `Batch export compositions with powerful presets and automation.

Features:
- Export multiple comps at once
- Custom naming templates
- Preset management
- Render queue automation
- Network render support

Save hours on your export workflow.`,
      shortDescription: "Batch export tool with custom presets and automation",
      thumbnailUrl:
        "https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Quick+Exporter",
      price: 19.99,
      fileUrl: "plugins/quick-exporter-v1.5.2.zxp",
      fileName: "QuickExporter_v1.5.2.zxp",
      fileSize: 1228800,
      version: "1.5.2",
      aeVersions: ["2023", "2024", "2025"],
      operatingSystems: ["Windows", "macOS"],
      status: PluginStatus.PUBLISHED,
      sellerId: seller1.id,
      categoryId: categories[4].id,
      publishedAt: new Date(),
      tags: {
        create: [
          { tag: { connect: { id: tags[2].id } } },
          { tag: { connect: { id: tags[4].id } } },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("\n📧 Test accounts:");
  console.log("Buyer: buyer@example.com / password123");
  console.log("Seller 1: seller1@example.com / password123");
  console.log("Seller 2: seller2@example.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
