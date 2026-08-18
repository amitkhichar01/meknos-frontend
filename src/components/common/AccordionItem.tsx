import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-bg-surface rounded-2xl p-5 sm:p-6 transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-bold text-text-primary group-hover:opacity-90 transition-opacity">
          {question}
        </span>
        <span
          className={`ml-4 p-2 rounded-full bg-bg-primary text-text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
          {answer}
        </div>
      )}
    </div>
  );
};
