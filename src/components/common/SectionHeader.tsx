import { Eyebrow } from "./Eyebrow";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  center?: boolean;
  className?: string;
  headingAs?: "h1" | "h2" | "h3";
}

export default function SectionHeader({
  eyebrow,
  heading,
  description,
  center = true,
  className = "",
  headingAs = "h2",
}: SectionHeaderProps) {
  const HeadingTag = headingAs;

  return (
    <div
      className={`flex flex-col space-y-4 max-w-3xl ${
        center ? "mx-auto text-center items-center" : "text-left items-start"
      } ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <HeadingTag className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text-primary  font-outfit">
        {heading}
      </HeadingTag>

      {description && (
        <p className="text-base sm:text-lg lg:text-xl text-text-secondary font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeader };

