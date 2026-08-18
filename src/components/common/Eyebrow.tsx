import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-bg-surface text-text-secondary ${className}`}
    >
      {children}
    </span>
  );
};
