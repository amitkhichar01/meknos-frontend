import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
}) => {
  return (
    <div
      className={`bg-bg-surface text-text-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${
        hoverEffect ? "hover:opacity-95 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
