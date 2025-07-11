
import type React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M13.786 4.467l-5.62 5.62-1.31-1.31a.75.75 0 00-1.06 1.06l1.839 1.84a.75.75 0 001.06 0l6.15-6.15a.75.75 0 10-1.06-1.06z" />
      <path fillRule="evenodd" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 1.5a10.5 10.5 0 100-21 10.5 10.5 0 000 21z" clipRule="evenodd" />
    </svg>
  );
}
