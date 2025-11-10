"use client";

import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import useAutoFocus from "@/lib/hooks/useAutoFocus";

const LoginModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useAutoFocus(inputRef);

  return (
    <div
      className="w-full bg-popover py-8 px-6
        flex flex-col items-center justify-center gap-6"
    >
      <div className="flex flex-col items-center">
        <p className="font-medium text-muted-foreground">
          Log in or sign up to
        </p>
        <h2 className="text-2xl font-bold">Vexel</h2>
      </div>
      <p className="text-muted-foreground text-center font-medium px-4">
        Enter your email to get a one time code.
        <br />
        New users sign up instantly, existing users log in.
      </p>
      <div className="relative w-full">
        <Input
          ref={inputRef}
          type="email"
          placeholder="Your Email"
          className="text-lg placeholder:text-muted-foreground-secondary p-4 pl-10 h-12 bg-input"
        />
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground" />
      </div>
      <Button
        variant="outline"
        className="bg-muted font-bold text-foreground text-base w-full h-12 shadow-sm"
      >
        Send code
      </Button>
      <div className="flex items-center w-full text-sm text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        <span className="px-3">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button className="flex items-center gap-3 font-bold w-full h-12">
        <Image
          src="/icons/google-icon.svg"
          width={50}
          height={50}
          alt="Google icon"
          className="w-5"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default LoginModal;
