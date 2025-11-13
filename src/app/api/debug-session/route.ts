// app/api/debug-session/route.ts
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  console.log("SESSION", session);
  return Response.json(session ?? { message: "no session" });
}
