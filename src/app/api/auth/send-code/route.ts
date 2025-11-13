import { NextResponse } from "next/server";
import { ZodError, ZodIssue, z } from "zod";
import { Resend } from "resend";
import { genCode, hashCode } from "@/lib/utils/otp";
import { prisma } from "@/lib/db/prisma";
import { EmailTemplate } from "@/components/email/email-template";

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const parsed = schema.parse(body);

    // Generate OTP
    const code = genCode(6);
    const hashed = await hashCode(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP (invalidate previous OTPs if needed)
    await prisma.oTP.create({
      data: {
        email: parsed.email,
        hashedCode: hashed,
        expiresAt,
      },
    });

    // Send email
    const { error } = await resend.emails.send({
      from: "Vexel <onboarding@resend.dev>", // ✅ sandbox domain
      to: [parsed.email],
      subject: "Your Verification Code",
      react: EmailTemplate({ code }),
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Verification code sent successfully.",
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const messages = err.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json({ error: messages }, { status: 400 });
    }

    console.error("Server error:", err);
    return NextResponse.json(
      { error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
