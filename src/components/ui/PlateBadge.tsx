import { cn } from "@/lib/utils";

interface PlateBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A UK rear-plate styled badge: blue GB euroband on the left,
 * bold condensed text on a yellow (or front-plate white) field.
 * This is Annax's signature visual motif — used sparingly for
 * prices, stock status, and the registration lookup field.
 */
export function PlateBadge({
  children,
  variant = "yellow",
  size = "md",
  className,
}: PlateBadgeProps) {
  const sizes = {
    sm: "h-7 text-xs",
    md: "h-9 text-base",
    lg: "h-14 text-2xl md:text-3xl",
  };

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-plate border-2 border-navy-950/80 shadow-card",
        sizes[size],
        className
      )}
    >
      <div className="flex items-center justify-center bg-plate-band px-1.5">
        <span className="font-display font-bold leading-none text-plate-yellow text-[0.6em] tracking-wider">
          GB
        </span>
      </div>
      <div
        className={cn(
          "flex items-center px-3 font-display font-bold uppercase tracking-plate text-navy-950",
          variant === "yellow" ? "bg-plate-gradient" : "bg-plate-white"
        )}
      >
        {children}
      </div>
    </div>
  );
}
