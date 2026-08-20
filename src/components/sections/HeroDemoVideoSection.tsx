import { useState } from "react";
import Container from "../common/Container";
import {
  MessageSquareIcon,
  SparklesIcon,
} from "../common/Icons";
import SectionHeader from "../common/SectionHeader";

export default function HeroDemoVideoSection() {
  const sampleQuestions = [
    "What does Amit do?",
    "What kind of work has Amit done?",
    "What can Amit help me with?",
    "How can I work with Amit?",
  ];

  const sampleAnswers: Record<string, string> = {
    "What does Amit do?":
      "Amit is a Full-Stack Web Developer who builds modern web applications and AI-powered products using React, TypeScript, Node.js, and GenAI.",

    "What kind of work has Amit done?":
      "He has built full-stack web applications, AI-powered products, conversational interfaces, and developer tools, with a focus on modern frontend experiences and scalable backend systems.",

    "What can Amit help me with?":
      "Amit can help with full-stack web development, React and TypeScript applications, AI integrations, conversational AI, and turning product ideas into working web experiences.",

    "How can I work with Amit?":
      "You can work with Amit on full-stack development, AI product development, freelance projects, or longer-term product collaborations. Reach out to discuss your project.",
  };

  const [activeQuestion, setActiveQuestion] = useState(sampleQuestions[0]);

  return (
    <section id="demo" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Section label */}
          <SectionHeader
            eyebrow="Live AI Agent"
            heading="See Meknos in action"
          />

          {/* Question Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl my-4 text-left">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`p-4 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeQuestion === q
                    ? "bg-bg-inverse text-text-inverse shadow-lg"
                    : "bg-bg-secondary text-text-primary hover:opacity-80"
                }`}
              >
                <span>“{q}”</span>
                {activeQuestion === q && <SparklesIcon className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Video / Interactive Demo Simulation Box */}
          <div className="w-full max-w-4xl mt-6 rounded-3xl bg-bg-inverse text-text-inverse overflow-hidden p-6 sm:p-10 shadow-2xl relative">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-6 opacity-80">
              <span className="text-xs font-mono tracking-wider ml-2">
                /in/amit
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs  text-text-inverse font-medium">
                <span className="w-2 h-2 rounded-full animate-pulse" />
                Live AI Agent
              </span>
            </div>

            <div className="space-y-10 text-left py-4">
              {/* User Prompt */}
              <div className="flex items-start justify-end gap-1">
                <div className="text-text-inverse text-sm sm:text-base max-w-xl">
                  <p className="font-semibold">{activeQuestion}</p>
                </div>

                <div className="p-2 rounded-full text-text-inverse">
                  <MessageSquareIcon className="w-4 h-4" />
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-text-inverse text-bg-inverse">
                  <SparklesIcon className="w-4 h-4" />
                </div>
                <div className="text-text-inverse text-sm sm:text-base max-w-xl leading-relaxed space-y-2">
                  <p className="font-medium">{sampleAnswers[activeQuestion]}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
            Instead of making someone search through your portfolio to
            understand what you do, let them simply ask.
          </p>
        </div>
      </Container>
    </section>
  );
}

export { HeroDemoVideoSection };
