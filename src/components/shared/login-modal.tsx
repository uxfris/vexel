"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";
import useAutoFocus from "@/lib/hooks/useAutoFocus";

const LoginModal = () => {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoFocus(inputRef);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("code");
        setMessage("Code sent — check your inbox!");
      } else {
        const data = await res.json();
        setMessage(data.error ?? "Failed to send code.");
      }
    } catch {
      setMessage("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const result = await signIn("email-code", {
        redirect: false,
        email,
        code,
      });

      if (result?.error) {
        setMessage("Invalid or expired code.");
      } else {
        setMessage("Success! Redirecting...");
        // ✅ Close modal + reload page for fresh session
        // onClose();
        window.location.reload();
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    signIn("google", { callbackUrl: window.location.href });
  }

  return (
    <div className="w-full bg-popover py-8 px-6 flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center">
        <p className="font-medium text-muted-foreground">
          Log in or sign up to
        </p>
        <h2 className="text-2xl font-bold">Vexel</h2>
      </div>

      {step === "email" && (
        <form onSubmit={handleSendCode} className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <Input
              ref={inputRef}
              type="email"
              placeholder="Your Email"
              className="text-lg placeholder:text-muted-foreground-secondary p-4 pl-10 h-12 bg-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground" />
          </div>
          <Button
            variant="outline"
            type="submit"
            disabled={loading}
            className="bg-muted font-bold text-foreground text-base w-full h-12 shadow-sm"
          >
            {loading ? "Sending..." : "Send code"}
          </Button>
        </form>
      )}

      {step === "code" && (
        <form
          onSubmit={handleVerifyCode}
          className="w-full flex flex-col gap-4"
        >
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="123456"
            className="text-lg text-center p-4 h-12 bg-input tracking-widest"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button
            className="font-bold text-base w-full h-12"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify code"}
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => setStep("email")}
            className="text-sm text-muted-foreground"
          >
            Change email
          </Button>
        </form>
      )}

      <div className="flex items-center w-full text-sm text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        <span className="px-3">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 font-bold w-full h-12"
      >
        <Image
          src="/icons/google-icon.svg"
          width={50}
          height={50}
          alt="Google icon"
          className="w-5"
        />
        <span>Log in with Google</span>
      </Button>

      {message && (
        <p className="text-sm text-center text-muted-foreground mt-2">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginModal;
