"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  Store,
  XIcon,
} from "lucide-react";
import { useSidebar } from "../hooks/useSidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useMedia } from "use-media";
import Brand from "@/components/ui/brand";
import { useModal } from "@/lib/hooks/useModal";
import SearchPluginModal from "./searchPluginModal";
import LoginModal from "@/components/shared/login";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const isMobile = useMedia({ maxWidth: 767 });
  const { open, toggle } = useSidebar();
  const { openModal } = useModal();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearchModal();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar when at the top
      if (currentScrollY < 10) {
        setShowNavbar(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    // if (isMobile) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  function openSearchModal() {
    openModal(<SearchPluginModal />, { className: "rounded-none" });
  }

  return (
    <header
      className={cn(
        "w-full z-100 border-b border-border bg-background transition-all duration-500",
        isMobile ? "fixed top-0 left-0 " : "",
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="flex items-center justify-between pl-4 pr-8 py-2">
        <div className="flex items-center gap-2 md:gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggle}
          >
            {open ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </Button>
          <Brand className="w-20 md:w-8" />
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Plugins
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Creators
            </Link>
            <button
              onClick={openSearchModal}
              className="hidden md:flex items-center gap-2 cursor-pointer"
            >
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
              <div className="flex items-center gap-1 bg-muted rounded-md px-2 py-1 text-muted-foreground">
                <span className="text-sm font-medium">⌘</span>
                <span className="text-sm font-medium">K</span>
              </div>
            </button>
          </nav>
        </div>
        <button
          onClick={openSearchModal}
          className="w-full md:hidden cursor-pointer flex items-center bg-input rounded-full border border-border mx-4 px-4 py-2 text-muted-foreground"
        >
          <span className="text-sm font-medium text-muted-foreground">
            Search Plugins
          </span>
        </button>
        <div className="flex items-center gap-6">
          <Link href="/sell" className="hidden md:block">
            <Button variant="ghost" className="p-0">
              Sell Plugins
            </Button>
          </Link>
          {/* <Link href="/pricing" className="md:hidden">
            <Store className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Link> */}
          {/* <Link href="/pricing" className="hidden md:block">
            <Button variant="outline" size="sm">
              <p className="text-sm font-medium">pricing</p>
            </Button>
          </Link> */}
          {session && (
            <Button variant="ghost" className="p-0">
              My Account
            </Button>
          )}
          <Link href="/cart">
            <ShoppingCartIcon className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Link>
          {!session && (
            <Button
              variant="ghost"
              className="p-0"
              onClick={() =>
                openModal(<LoginModal />, {
                  className: "max-w-96",
                })
              }
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
