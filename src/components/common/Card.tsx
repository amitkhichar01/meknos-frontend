import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = "",
  hoverEffect = true,
}: CardProps) {
  const hasBg = /\bbg-/.test(className);
  const hasText = /\btext-/.test(className);

  const defaultBg = hasBg ? "" : "bg-bg-secondary";
  const defaultText = hasText ? "" : "text-text-primary";

  return (
    <div
      className={`${defaultBg} ${defaultText} rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${
        hoverEffect ? "hover:opacity-95 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export { Card };
