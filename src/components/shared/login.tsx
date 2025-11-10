import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import Image from "next/image";

<div className="fixed inset-0 z-100 bg-black/70 flex items-center justify-center">
  <div
    className="w-full bg-popover rounded-lg max-w-96 py-8 px-6 
        flex flex-col items-center justify-center gap-6"
  >
    <div className="flex flex-col items-center">
      <p className="font-medium text-muted-foreground">Log in or sign up to</p>
      <p className="text-2xl font-bold">Vexel</p>
    </div>
    <p className="text-muted-foreground text-center font-medium px-4">
      Enter your email to get a one time code.
      <br />
      New users sign up instantly, existing users log in.
    </p>
    <div className="relative w-full">
      <Input
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
    <div className="flex items-center w-full">
      <Divider classNames="w-full" />
      <span className="px-3">or</span>
      <Divider classNames="w-full" />
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
</div>;
