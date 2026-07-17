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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.46-.14-.65.14-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.2-.29.29-.48.1-.2.05-.37-.02-.51-.08-.15-.65-1.58-.9-2.16-.24-.58-.48-.5-.65-.5h-.56c-.2 0-.51.07-.78.36-.26.29-1.02.99-1.02 2.42s1.04 2.81 1.19 3c.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.13-.26-.2-.55-.34zM12.04 2C6.5 2 2 6.48 2 12c0 1.85.5 3.6 1.4 5.1L2 22l5.05-1.32A9.96 9.96 0 0 0 12.04 22C17.5 22 22 17.52 22 12S17.5 2 12.04 2zm0 18.13c-1.67 0-3.24-.46-4.58-1.27l-.33-.2-3 .78.8-2.92-.21-.3A8.15 8.15 0 0 1 3.86 12c0-4.5 3.68-8.15 8.18-8.15S20.22 7.5 20.22 12s-3.68 8.13-8.18 8.13z" />
  </svg>
);

const links = [
  { href: "/", label: "Home" },
  { href: "/stock", label: "Stock" },
  { href: "/finance", label: "Finance" },
  { href: "/part-exchange", label: "Part Exchange" },
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { ids: wishlistIds, mounted: wishlistMounted } = useWishlist();
  const { ids: compareIds, mounted: compareMounted } = useCompare();

  const whatsappMessage = encodeURIComponent(
    "Hi Annax Auto Traders, I'd like to ask about a vehicle."
  );

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
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Annax Auto Traders home" className="shrink-0">
          <Logo />
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

          {/* WhatsApp — icon only, visible at every breakpoint */}
          <a
            href={`https://wa.me/${business.contact.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] transition-colors hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          {/* Phone — icon only below md, icon + number pill from md up */}
          <a
            href={`tel:${business.contact.phone}`}
            aria-label={`Call us on ${business.contact.phoneDisplay}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-ignition hover:text-ignition-400 md:hidden"
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
