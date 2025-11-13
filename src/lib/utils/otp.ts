import crypto from "crypto";
import bcrypt from "bcryptjs";

export function genCode(len = 6) {
  const max = 10 ** len;
  const num =
    Math.floor(Math.random() * (max - 10 ** (len - 1))) + 10 ** (len - 1);
  return String(num);
}

export async function hashCode(code: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(code, salt);
}

export async function verifyCode(hashed: string, code: string) {
  return bcrypt.compare(code, hashed);
}
