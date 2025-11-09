import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Divider from "./divider";
import Image from "next/image";
import { SiX } from "@icons-pack/react-simple-icons";

export default function Footer() {
  const navLinks = {
    Resources: ["Overview", "Features", "Pricing", "Releases"],
    Marketplace: ["About", "Careers", "Press", "Contact"],
    Company: ["Blog", "Guides", "Help Center", "Community"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    Socials: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };
  return (
    <footer className="w-full border-t border-border py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-12 w-full">
        <div className="grow">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Vexel Newsletter
          </h1>
          <p className="text-muted-foreground font-medium">
            Get the scoop on our newest releases, updates, and insightful
            articles.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 border border-border p-4 md:p-6 w-full md:w-auto md:grow rounded-xl">
          <Input
            className="bg-input h-14 text-lg placeholder:text-muted-foreground-secondary"
            placeholder="Your Email"
          />
          <Button
            size="xl"
            variant="outline"
            className="w-full md:w-auto md:px-4 text-lg font-bold text-foreground"
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 mt-5">
        {Object.entries(navLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className="mb-2 mt-6 text-sm font-bold text-muted-foreground-secondary">
              {section}
            </h3>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLocaleLowerCase().replace("/\s+/g", "-")}`}
                    className="font-medium hover:text-muted-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Divider classNames="mt-12 mb-4" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Vexel"
              width={80}
              height={80}
              className="w-5"
            />
          </Link>
          <p className="text-sm font-medium">
            Vexel —{" "}
            <span className="text-muted-foreground">
              Designed in Indonesia, supplied Worldwide
            </span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Button variant="outline" className="flex gap-2 p-2 h-8">
            <SiX size={16} />
            Follow Us
          </Button>
        </div>
      </div>
    </footer>
  );
}
