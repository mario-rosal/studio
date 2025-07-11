
import type React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g fill="currentColor">
        {/* Central Hexagon Shape */}
        <path d="M50 25 l21.65 12.5 v25 L50 75 l-21.65 -12.5 v-25 L50 25z" fillOpacity="0.7" />
        <path d="M50 25 L28.35 37.5 L28.35 62.5 L50 75 V 25z" fillOpacity="1" />
        <path d="M50 25 l21.65 12.5 L50 50 V25z" fillOpacity="0.5" />
        <path d="M50 75 l21.65 -12.5 L50 50 V75z" fillOpacity="0.3" />

        {/* Checkmark */}
        <path
          d="M45 53 l-7 -7 l3 -3 l4 4 l8 -8 l3 3 z"
          fill="hsl(var(--primary-foreground))"
        />

        {/* Top-left arm */}
        <path d="M28.35 37.5 l-15 -8.66" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="10.35" cy="27.84" r="5" />
        
        {/* Top-right arm */}
        <path d="M71.65 37.5 l15 -8.66" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="89.65" cy="27.84" r="5" />

        {/* Bottom arm */}
        <path d="M50 75 v20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="98" r="5" />
      </g>
    </svg>
  );
}
