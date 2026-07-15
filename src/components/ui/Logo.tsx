interface LogoProps {
  className?: string;
}

/**
 * Renders the real Annax Auto Traders logo. Uses the white/reversed
 * variant (logo-white.png) since both the navbar and footer sit on a
 * navy background — the full-colour original (logo.png) is kept in
 * /public too, for anywhere with a light background in future.
 */
export function Logo({ className }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-white.png"
      alt="Annax Auto Traders"
      className={`h-10 w-auto object-contain ${className ?? ""}`}
    />
  );
}
