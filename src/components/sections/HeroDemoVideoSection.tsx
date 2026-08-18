import React, { useState } from "react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { Button } from "../common/Button";
import { PlayIcon, MessageSquareIcon, SparklesIcon, CheckIcon } from "../common/Icons";

export const HeroDemoVideoSection: React.FC = () => {
  const sampleQuestions = [
    "What does Amit specialize in?",
    "What projects has he built?",
    "Does he have experience with GenAI?",
    "How can I work with him?",
  ];

  const sampleAnswers: Record<string, string> = {
    "What does Amit specialize in?":
      "Amit specializes in Full-Stack Web Development, AI Integrations, and Modern Frontend Architecture using React, TypeScript, and Tailwind.",
    "What projects has he built?":
      "He built Meknos (AI profile platform), real-time conversational agents, and high-performance web applications with rich user interfaces.",
    "Does he have experience with GenAI?":
      "Yes! He works extensively with LLM APIs, custom knowledge bases, RAG pipelines, and agentic coding tools.",
    "How can I work with him?":
      "You can hire him for freelance consulting, full-stack dev contracts, or collaborative AI projects. Click below to reach out!",
  };

  const [activeQuestion, setActiveQuestion] = useState(sampleQuestions[0]);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section id="demo" className="py-16 sm:py-24 bg-bg-surface/50">
      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Section label */}
          <Eyebrow>See Meknos in action</Eyebrow>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            From a profile link to a real conversation.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Instead of making someone search through your portfolio to understand what you do, let
            them simply ask.
          </p>

          {/* Question Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl my-4 text-left">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`p-4 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  activeQuestion === q
                    ? "bg-bg-inverse text-text-inverse shadow-lg"
                    : "bg-bg-surface text-text-primary hover:opacity-80"
                }`}
              >
                <span>“{q}”</span>
                {activeQuestion === q && <SparklesIcon className="w-4 h-4" />}
              </button>
            ))}
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
            Meknos answers using the information you provide, so visitors can understand you faster
            and have a more natural conversation with your profile.
          </p>

          {/* Video / Interactive Demo Simulation Box */}
          <div className="w-full max-w-4xl mt-6 rounded-3xl bg-bg-inverse text-text-inverse overflow-hidden p-6 sm:p-10 shadow-2xl relative">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-6 opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-bg-surface" />
                <div className="w-3 h-3 rounded-full bg-bg-surface" />
                <div className="w-3 h-3 rounded-full bg-bg-surface" />
                <span className="text-xs font-mono tracking-wider ml-2">meknos.ai/amit</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-bg-surface text-text-inverse font-medium">
                <span className="w-2 h-2 rounded-full bg-text-inverse animate-pulse" />
                Live AI Agent
              </span>
            </div>

            {/* Video Player or Interactive Simulation */}
            {isPlayingVideo ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-bg-surface flex items-center justify-center animate-spin">
                  <SparklesIcon className="w-8 h-8 text-text-inverse" />
                </div>
                <p className="text-lg font-bold text-text-inverse">Playing Meknos Demo Video...</p>
                <button
                  onClick={() => setIsPlayingVideo(false)}
                  className="text-xs text-text-inverse/70 hover:text-text-inverse underline cursor-pointer"
                >
                  Switch to Interactive Q&A Mode
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-left py-4">
                {/* User Prompt */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-bg-surface text-text-inverse">
                    <MessageSquareIcon className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-bg-surface text-text-inverse text-sm sm:text-base max-w-xl">
                    <p className="font-semibold">{activeQuestion}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3 pl-4 sm:pl-8">
                  <div className="p-2 rounded-full bg-text-inverse text-bg-inverse">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl bg-bg-surface/80 text-text-inverse text-sm sm:text-base max-w-xl leading-relaxed space-y-2">
                    <p className="font-medium">{sampleAnswers[activeQuestion]}</p>
                    <div className="flex items-center gap-2 pt-2 text-xs opacity-70">
                      <CheckIcon className="w-3.5 h-3.5" /> Verified by Amit's Meknos Profile
                    </div>
                  </div>
                </div>

                {/* Play Video Trigger Overlay */}
                <div className="pt-6 flex justify-center">
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg-surface text-text-inverse hover:opacity-80 transition-all cursor-pointer text-xs sm:text-sm font-semibold"
                  >
                    <PlayIcon className="w-4 h-4" /> Play Full Video Walkthrough
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video CTA & Caption */}
          <div className="pt-6 flex flex-col items-center space-y-3">
            <Button variant="primary" size="lg" href="#create">
              Try a live Meknos
            </Button>
            <p className="text-sm font-bold text-text-secondary tracking-wide uppercase">
              Your profile. Your information. Your AI.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
