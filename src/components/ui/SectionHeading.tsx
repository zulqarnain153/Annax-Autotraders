import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-block font-display text-sm font-semibold uppercase tracking-[0.2em]",
            light ? "text-ignition-400" : "text-ignition"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 font-body text-base leading-relaxed sm:text-lg",
            light ? "text-steel-300" : "text-steel-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
