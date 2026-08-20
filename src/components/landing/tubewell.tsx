"use client";

/**
 * A friendly hand-pump / tubewell illustration with animated flowing water.
 * Pure inline SVG (uses SMIL <animate>) so it needs no extra CSS or assets.
 */
export function Tubewell({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-label="Tubewell pumping fresh water"
      className={className}
    >
      <defs>
        <linearGradient id="tw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="tw-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="tw-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect x="0" y="0" width="320" height="320" rx="28" fill="url(#tw-sky)" />
      <circle cx="252" cy="66" r="30" fill="#fde68a" opacity="0.9" />

      {/* Ground */}
      <path d="M0 248 H320 V320 H0 Z" fill="#a7f3d0" />
      <path
        d="M0 248 Q160 224 320 248 V262 Q160 240 0 262 Z"
        fill="#6ee7b7"
        opacity="0.7"
      />

      {/* Concrete platform */}
      <rect x="96" y="238" width="150" height="20" rx="6" fill="#cbd5e1" />
      <rect x="96" y="238" width="150" height="7" rx="3" fill="#e2e8f0" />

      {/* Vertical rising pipe */}
      <rect x="150" y="120" width="20" height="122" rx="5" fill="url(#tw-metal)" />
      <rect x="146" y="114" width="28" height="12" rx="4" fill="#334155" />

      {/* Pump head */}
      <path
        d="M138 92 h44 a10 10 0 0 1 10 10 v16 a10 10 0 0 1 -10 10 h-44 a10 10 0 0 1 -10 -10 v-16 a10 10 0 0 1 10 -10 Z"
        fill="url(#tw-metal)"
      />
      {/* Curved spout */}
      <path
        d="M182 100 q34 2 36 30 l-16 0 q-2 -14 -20 -16 Z"
        fill="#475569"
      />

      {/* Handle (gently rocking to suggest pumping) */}
      <g transform="translate(140 96)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-8 0 0; 6 0 0; -8 0 0"
          dur="1.6s"
          repeatCount="indefinite"
          additive="sum"
        />
        <rect x="-58" y="-6" width="70" height="12" rx="6" fill="#334155" />
        <circle cx="-58" cy="0" r="9" fill="#1e293b" />
      </g>

      {/* Flowing water stream from the spout */}
      <g>
        <rect x="203" y="132" width="9" height="46" rx="4" fill="url(#tw-water)">
          <animate
            attributeName="height"
            values="20;52;20"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Falling droplets */}
        <circle cx="207" cy="185" r="5" fill="#38bdf8">
          <animate
            attributeName="cy"
            values="180;236;180"
            dur="1.1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;1;0;1"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="207" cy="200" r="4" fill="#7dd3fc">
          <animate
            attributeName="cy"
            values="190;236;190"
            dur="1.1s"
            begin="0.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;1;0;1"
            dur="1.1s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Collected water pool with ripples */}
      <ellipse cx="207" cy="240" rx="46" ry="12" fill="url(#tw-water)" />
      <ellipse cx="207" cy="238" rx="46" ry="10" fill="#bae6fd" opacity="0.55">
        <animate
          attributeName="rx"
          values="20;46;20"
          dur="1.1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0.6"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}
