import Image from "next/image";

interface LogoProps {
  className?: string;
}

/**
 * Renders the real Annax Auto Traders logo. Uses the white/reversed
 * variant (logo-white.png) since both the navbar and footer sit on a
 * dark charcoal background — the full-colour original (logo.png) is
 * kept in /public too, for anywhere with a light background in future.
 *
 * Sized generously (h-11 / 44px) on mobile so it stays clearly legible
 * in the header on small screens, scaling up slightly on larger
 * viewports. Uses next/image with priority since it's always above
 * the fold.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo-white.png"
      alt="Annax Auto Traders"
      width={237}
      height={182}
      priority
      className={`h-11 w-auto object-contain sm:h-12 lg:h-14 ${className ?? ""}`}
    />
  );
}
