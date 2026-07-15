import { cn } from "@/lib/utils";
import { BodyType } from "@/lib/types";

interface VehicleSilhouetteProps {
  bodyType: BodyType;
  seed?: number;
  label?: string;
  className?: string;
  angle?: "hero" | "front" | "side" | "rear" | "interior";
}

const bodyPaths: Record<BodyType, string> = {
  Hatchback:
    "M40 128 C40 110 55 100 78 98 L96 78 C104 70 116 66 130 66 L186 66 C198 66 208 71 216 80 L234 98 C256 100 270 110 270 128 L270 140 L40 140 Z",
  Saloon:
    "M30 128 C30 110 45 101 68 99 L88 76 C96 68 108 64 122 64 L200 64 C212 64 222 69 229 78 L246 99 C266 102 282 111 282 128 L282 140 L30 140 Z",
  Estate:
    "M28 126 C28 108 42 100 64 98 L84 74 C92 66 104 62 118 62 L212 62 C222 62 230 68 232 78 L236 98 C258 100 284 108 284 126 L284 140 L28 140 Z",
  SUV: "M26 122 C26 100 44 90 70 88 L92 62 C100 54 112 50 126 50 L204 50 C216 50 226 56 232 66 L248 88 C270 90 288 100 288 122 L288 140 L26 140 Z",
  Coupe:
    "M36 128 C36 108 52 99 76 97 L100 72 C110 62 124 58 138 58 L192 58 C202 58 210 63 215 71 L234 97 C254 100 268 110 268 128 L268 140 L36 140 Z",
  Convertible:
    "M36 128 C36 112 52 103 76 101 L100 86 C112 78 128 75 144 75 L188 75 C198 75 206 79 212 86 L232 101 C252 104 266 113 266 128 L266 140 L36 140 Z",
  MPV: "M30 120 C30 96 46 86 70 84 L88 60 C96 52 108 48 122 48 L210 48 C222 48 232 54 236 64 L250 84 C268 87 286 96 286 120 L286 140 L30 140 Z",
};

const angleLabels: Record<NonNullable<VehicleSilhouetteProps["angle"]>, string> = {
  hero: "Front Three-Quarter",
  front: "Front View",
  side: "Side Profile",
  rear: "Rear View",
  interior: "Interior",
};

export function VehicleSilhouette({
  bodyType,
  seed = 1,
  label,
  className,
  angle = "hero",
}: VehicleSilhouetteProps) {
  const hueShift = (seed * 37) % 40; // subtle per-vehicle variation, staying in the orange/amber family
  const path = bodyPaths[bodyType] ?? bodyPaths.Saloon;
  const gradientId = `spotlight-${seed}-${angle}`;
  const isInterior = angle === "interior";

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-navy-radial",
        className
      )}
    >
      {/* Blueprint grid texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <pattern id={`grid-${seed}-${angle}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#8B93A6" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#grid-${seed}-${angle})`} />
      </svg>

      {/* Floodlight glow */}
      <div
        className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsla(${18 + hueShift}, 100%, 55%, 0.35), transparent 70%)`,
        }}
      />

      {!isInterior ? (
        <svg
          viewBox="0 0 320 160"
          className="relative h-2/3 w-2/3 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F7F8FA" />
              <stop offset="100%" stopColor="#8B93A6" />
            </linearGradient>
          </defs>
          {/* Ground reflection */}
          <ellipse cx="160" cy="146" rx="120" ry="8" fill="#000" opacity="0.35" />
          {/* Body */}
          <path d={path} fill={`url(#${gradientId})`} opacity="0.9" />
          {/* Windows band */}
          <path
            d={path}
            fill="none"
            stroke="#0B1428"
            strokeWidth="2"
            opacity="0.4"
          />
          {/* Wheels */}
          <circle cx="92" cy="140" r="18" fill="#0B1428" stroke="#FF4612" strokeWidth="2" />
          <circle cx="224" cy="140" r="18" fill="#0B1428" stroke="#FF4612" strokeWidth="2" />
          <circle cx="92" cy="140" r="7" fill="#1C2C4F" />
          <circle cx="224" cy="140" r="7" fill="#1C2C4F" />
        </svg>
      ) : (
        <svg viewBox="0 0 320 160" className="relative h-2/3 w-2/3" aria-hidden="true">
          <rect x="30" y="40" width="260" height="90" rx="10" fill="#131F3D" stroke="#8B93A6" strokeWidth="1.5" />
          <rect x="50" y="55" width="90" height="55" rx="6" fill="#0B1428" stroke="#FF4612" strokeWidth="1.5" />
          <circle cx="220" cy="75" r="22" fill="none" stroke="#FFD204" strokeWidth="2" />
          <circle cx="220" cy="75" r="4" fill="#FFD204" />
          <line x1="160" y1="60" x2="160" y2="115" stroke="#8B93A6" strokeWidth="1" />
        </svg>
      )}

      <span className="absolute bottom-3 left-3 rounded-full border border-steel-500/30 bg-navy-950/60 px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-steel-300 backdrop-blur-sm">
        {label ?? angleLabels[angle]}
      </span>
      <span className="absolute right-3 top-3 font-display text-[10px] font-bold uppercase tracking-widest text-steel-400/60">
        AAT
      </span>
    </div>
  );
}
