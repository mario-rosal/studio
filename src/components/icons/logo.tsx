
import type React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <g>
        {/* Central Hexagon - using multiple paths for different face colors */}
        <path d="M50 25 L71.65 37.5 L50 50 L28.35 37.5 Z" fill="#2C3E50" />
        <path d="M28.35 37.5 L50 50 L50 75 L28.35 62.5 Z" fill="#34495E" />
        <path d="M71.65 37.5 L71.65 62.5 L50 75 L50 50 Z" fill="#5D7A99" />

        {/* Checkmark */}
        <path
          d="M45 53 l-7 -7 l3 -3 l4 4 l8 -8 l3 3 z"
          fill="#34495E"
          fillOpacity="0.7"
        />

        {/* Arms and Circles */}
        <g stroke="#5D7A99" strokeWidth="4" strokeLinecap="round">
          {/* Top-left arm */}
          <path d="M28.35 37.5 l-15 -8.66" />
          <circle cx="10.35" cy="27.84" r="5" fill="#5D7A99" />
          
          {/* Top-right arm */}
          <path d="M71.65 37.5 l15 -8.66" />
          <circle cx="89.65" cy="27.84" r="5" fill="#5D7A99" />

          {/* Bottom arm */}
          <path d="M50 75 v20" />
          <circle cx="50" cy="98" r="5" fill="#5D7A99" />
        </g>
      </g>
    </svg>
  );
}
