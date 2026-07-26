import Image from "next/image";

interface LogoProps {
  className?: string;
  /** "default" (unchanged, used by the footer) or "large" (~30% bigger at
   *  every breakpoint — used by the navbar so the logo reads clearly at a
   *  glance). Precise pixel sizes are used for "large" so the increase is
   *  consistent across breakpoints rather than jumping unevenly between
   *  Tailwind's fixed height steps. */
  size?: "default" | "large";
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
export function Logo({ className, size = "default" }: LogoProps) {
  const sizeClasses =
    size === "large"
      ? "h-[57px] sm:h-[62px] lg:h-[73px]"
      : "h-11 sm:h-12 lg:h-14";

  return (
    <Image
      src="/logo-white.png"
      alt="Annax Auto Traders"
      width={237}
      height={182}
      priority
      className={`w-auto object-contain ${sizeClasses} ${className ?? ""}`}
    />
  );
}
