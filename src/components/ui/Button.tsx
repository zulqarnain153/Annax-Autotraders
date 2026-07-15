import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps extends BaseProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ignition-gradient text-white shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
  secondary:
    "bg-plate-gradient text-navy-950 shadow-card hover:-translate-y-0.5",
  outline:
    "border-2 border-white/25 text-white backdrop-blur-sm hover:border-ignition hover:bg-white/5",
  ghost: "text-navy-900 hover:text-ignition",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  showArrow = false,
  className,
  children,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold uppercase tracking-wide transition-all duration-300 ease-out",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {Icon && <Icon className="h-[1.1em] w-[1.1em]" />}
      {children}
      {showArrow && (
        <ArrowRight className="h-[1.1em] w-[1.1em] transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
