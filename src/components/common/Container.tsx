interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({
  children,
  className = "",
  id,
}: ContainerProps) {
  return (
    <div
      id={id}
      className={`max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 ${className}`}
    >
      {children}
    </div>
  );
}
