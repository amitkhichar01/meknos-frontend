import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-bg-secondary text-text-secondary ${className}`}
    >
      {children}
    </span>
  );
}

export { Eyebrow };
