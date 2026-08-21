"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { business } from "@/lib/business";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16.6 5.82c-1.02-.88-1.6-2.15-1.66-3.62V2h-3.32v13.9c0 1.51-1.23 2.74-2.74 2.74a2.74 2.74 0 0 1 0-5.48c.25 0 .49.03.72.09V9.9a6.06 6.06 0 0 0-.72-.04A6.08 6.08 0 0 0 2.7 15.94 6.08 6.08 0 0 0 8.78 22a6.08 6.08 0 0 0 6.08-6.06V9.28a9.4 9.4 0 0 0 5.48 1.76V7.7c-1.28 0-2.47-.42-3.42-1.14-.1-.07-.19-.15-.28-.24-.02-.02-.03-.03-.04-.05z" />
  </svg>
);

const sitemap = [
  {
    heading: "Explore",
    links: [
      { href: "/stock", label: "View Stock" },
      { href: "/finance", label: "Finance" },
      { href: "/part-exchange", label: "Part Exchange" },
      { href: "/sell-your-car", label: "Sell Your Car" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="h-14" />
            <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-steel-400">
              {business.shortDescription}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, href: business.social.instagram, label: "Instagram" },
                { icon: Facebook, href: business.social.facebook, label: "Facebook" },
                { icon: TikTokIcon, href: business.social.tiktok, label: "TikTok" },
                { icon: Youtube, href: business.social.youtube, label: "YouTube" },
                { icon: Linkedin, href: business.social.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-steel-300 transition-colors hover:border-ignition hover:text-ignition-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sitemap.map((group) => (
            <div key={group.heading}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-steel-400 transition-colors hover:text-ignition-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-steel-400">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ignition-400" />
                {business.address.full}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ignition-400" />
                <a href={`tel:${business.contact.phone}`}>{business.contact.phoneDisplay}</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ignition-400" />
                <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ignition-400" />
                Mon–Fri 9am–6pm · Sat 9am–5pm
              </li>
            </ul>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                Newsletter
              </label>
              <div className="mt-2 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent px-4 py-2.5 font-body text-sm text-white placeholder:text-steel-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center justify-center bg-ignition-gradient px-4 text-navy-950"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 font-body text-xs text-ignition-400">
                  You&apos;re subscribed — thanks for joining.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="font-body text-xs text-steel-500">
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <p className="font-body text-xs text-steel-500">
            Registered in England & Wales · Authorised & regulated for consumer credit broking
          </p>
        </div>
      </div>
    </footer>
  );
}
