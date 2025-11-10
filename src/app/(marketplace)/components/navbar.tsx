"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  Store,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useSidebar } from "../hooks/useSidebar";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import SearchPlugin from "./searchPlugin";
import { cn } from "@/lib/utils/cn";
import { useMedia } from "use-media";
import Brand from "@/components/ui/brand";

const Navbar = () => {
  const isMobile = useMedia({ maxWidth: 767 });
  const { open, toggle } = useSidebar();
  const { searchToggle } = useSearch();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchToggle();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        return;
      }
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

      setLastScrollY(currentScrollY);
    };

    // if (isMobile) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, lastScrollY]);
  return (
    <header
      className={cn(
        "w-full z-100 border-b border-border bg-background transition-all duration-500",
        isMobile ? "fixed top-0 left-0 " : "",
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2">
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
              onClick={searchToggle}
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
          onClick={searchToggle}
          className="w-full md:hidden cursor-pointer flex items-center bg-input rounded-full border border-border mx-4 px-4 py-2 text-muted-foreground"
        >
          <span className="text-sm font-medium text-muted-foreground">
            Search Plugins
          </span>
        </button>
        <div className="flex items-center gap-8">
          <Link href="/sell" className="hidden md:block">
            <p className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
              Sell Plugins
            </p>
          </Link>
          <Link href="/pricing" className="md:hidden">
            <Store className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Link>
          {/* <Link href="/pricing" className="hidden md:block">
            <Button variant="outline" size="sm">
              <p className="text-sm font-medium">pricing</p>
            </Button>
          </Link> */}

          <Link href="/cart">
            <ShoppingCartIcon className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </Link>
          <Link href="/login">
            {false ? (
              <UserIcon className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            ) : (
              <p className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                Login
              </p>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
