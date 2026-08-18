import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs sm:text-sm rounded-full gap-1.5",
    md: "px-6 py-3 text-sm sm:text-base rounded-full gap-2",
    lg: "px-8 py-4 text-base sm:text-lg rounded-full gap-2.5",
  };

  const variantStyles = {
    primary: "bg-bg-inverse text-text-inverse hover:opacity-90 active:scale-98 shadow-md",
    secondary: "bg-bg-surface text-text-primary hover:opacity-80 active:scale-98",
    ghost: "bg-transparent text-text-primary hover:bg-bg-surface",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
        {icon && <span className="inline-flex items-center">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="inline-flex items-center">{icon}</span>}
    </button>
  );
};
