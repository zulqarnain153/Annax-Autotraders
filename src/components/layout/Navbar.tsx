"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Heart, GitCompare, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/stock", label: "Stock" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/part-exchange", label: "Part Exchange" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { ids: wishlistIds, mounted: wishlistMounted } = useWishlist();
  const { ids: compareIds, mounted: compareMounted } = useCompare();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-navy-950/90 shadow-card backdrop-blur-lg"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
        <Link href="/" aria-label="Annax Auto Traders home" className="shrink-0">
          <Logo size="large" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-body text-sm font-medium transition-colors",
                    active ? "text-ignition-400" : "text-steel-300 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ignition"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/stock?saved=1"
            className="relative hidden rounded-full p-2 text-steel-300 transition-colors hover:text-ignition-400 sm:flex"
            aria-label="Saved vehicles"
          >
            <Heart className="h-5 w-5" />
            {wishlistMounted && wishlistIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ignition text-[10px] font-bold text-white">
                {wishlistIds.length}
              </span>
            )}
          </Link>
          <Link
            href="/stock?compare=1"
            className="relative hidden rounded-full p-2 text-steel-300 transition-colors hover:text-ignition-400 sm:flex"
            aria-label="Compare vehicles"
          >
            <GitCompare className="h-5 w-5" />
            {compareMounted && compareIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ignition text-[10px] font-bold text-white">
                {compareIds.length}
              </span>
            )}
          </Link>

          {/* Phone — icon only below md, icon + number pill from md up.
              WhatsApp intentionally removed from the header per request;
              it remains on the left-side floating buttons. */}
          <a
            href={`tel:${business.contact.phone}`}
            aria-label={`Call us on ${business.contact.phoneDisplay}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:border-ignition hover:text-ignition-400 md:hidden"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a href={`tel:${business.contact.phone}`} className="hidden md:block">
            <Button variant="outline" size="sm" icon={Phone}>
              {business.contact.phoneDisplay}
            </Button>
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy-950 lg:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-3 font-body text-base",
                      pathname === link.href
                        ? "text-ignition-400"
                        : "text-steel-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 flex items-center gap-4 px-3">
                <Link href="/stock?saved=1" className="flex items-center gap-2 text-steel-300">
                  <Heart className="h-5 w-5" /> Saved ({wishlistMounted ? wishlistIds.length : 0})
                </Link>
                <Link href="/stock?compare=1" className="flex items-center gap-2 text-steel-300">
                  <GitCompare className="h-5 w-5" /> Compare ({compareMounted ? compareIds.length : 0})
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
