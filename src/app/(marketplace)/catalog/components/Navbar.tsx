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
import { useSidebar } from "../context/sidebar-context";
import { useSearch } from "../context/search-context";
import { useEffect } from "react";

const Navbar = () => {
  const { open, toggle } = useSidebar();
  const { searchToggle } = useSearch();

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
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
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
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Vexel"
              width={80}
              height={80}
              className="w-20 md:w-8"
            />
          </Link>
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
          <Link href="/pricing" className="hidden md:block">
            <Button variant="outline" size="sm">
              <p className="text-sm font-medium">pricing</p>
            </Button>
          </Link>

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
