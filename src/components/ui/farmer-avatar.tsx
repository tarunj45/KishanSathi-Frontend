import { cn } from "@/lib/utils";

/**
 * Flat-style farmer avatar (straw hat + friendly face) rendered as inline SVG,
 * so it always loads and clearly reads as a farmer. Size via className.
 */
export function FarmerAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-emerald-100",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" width="100%" height="100%" role="img">
        <defs>
          <linearGradient id="fa-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
        </defs>

        {/* background */}
        <circle cx="48" cy="48" r="48" fill="url(#fa-bg)" />

        {/* shirt / shoulders */}
        <path d="M22 96 C24 76 36 68 48 68 C60 68 72 76 74 96 Z" fill="#15803d" />
        <path
          d="M42 66 L48 74 L54 66 Z"
          fill="#f4c69b"
        />

        {/* neck */}
        <rect x="43" y="58" width="10" height="10" rx="4" fill="#e6a97e" />

        {/* head */}
        <circle cx="48" cy="47" r="15" fill="#f4c69b" />

        {/* eyes */}
        <circle cx="42.5" cy="47" r="1.7" fill="#3f2f24" />
        <circle cx="53.5" cy="47" r="1.7" fill="#3f2f24" />

        {/* smile */}
        <path
          d="M42.5 52.5 Q48 57 53.5 52.5"
          stroke="#3f2f24"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* hat dome */}
        <path
          d="M35 37 C35 24 61 24 61 37 Z"
          fill="#fbbf24"
        />
        {/* hat band */}
        <rect x="35" y="34" width="26" height="4.5" rx="2.2" fill="#b45309" />
        {/* hat brim */}
        <ellipse cx="48" cy="38" rx="27" ry="6.5" fill="#f59e0b" />
        <ellipse cx="48" cy="37" rx="27" ry="5.5" fill="#fbbf24" />
      </svg>
    </span>
  );
}
