import React, { useState } from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";

export const UseCasesSection: React.FC = () => {
  const useCases = [
    {
      role: "For Developers",
      title: "Show your tech stack, projects, GitHub work, experience, and the problems you've solved.",
      highlight: "Help technical visitors understand your work faster.",
    },
    {
      role: "For Freelancers",
      title: "Show your services, experience, previous work, and the type of projects you take on.",
      highlight: "Let potential clients understand what you can do before they contact you.",
    },
    {
      role: "For Creators",
      title: "Bring your work, platforms, projects, and professional story into one interactive profile.",
      highlight: "Give your audience a better way to discover what you do.",
    },
    {
      role: "For Consultants",
      title: "Present your expertise, experience, industries, and services in a profile people can interact with.",
      highlight: "Turn your expertise into an accessible conversation.",
    },
    {
      role: "For Students",
      title: "Build a professional presence before you have years of experience. Show your projects, skills, education, achievements, and what you're learning.",
      highlight: "Your experience can start before your career does.",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-bg-surface/40">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="Feature Showcase / Use Cases"
            heading="One profile. Different opportunities."
          />

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {useCases.map((uc, index) => (
              <button
                key={uc.role}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === index
                    ? "bg-bg-inverse text-text-inverse shadow-md"
                    : "bg-bg-surface text-text-secondary hover:text-text-primary"
                }`}
              >
                {uc.role}
              </button>
            ))}
          </div>

          {/* Featured Active Card */}
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 sm:p-12 text-center space-y-6 bg-bg-surface">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-bg-inverse text-text-inverse">
                {useCases[activeTab].role}
              </span>
              <p className="text-xl sm:text-2xl font-semibold text-text-primary leading-relaxed">
                {useCases[activeTab].title}
              </p>
              <p className="text-base sm:text-lg font-bold text-text-secondary pt-2">
                {useCases[activeTab].highlight}
              </p>
            </Card>
          </div>

          {/* Grid Layout of All Use Cases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {useCases.map((uc, i) => (
              <Card
                key={uc.role}
                className={`flex flex-col justify-between space-y-4 cursor-pointer transition-all ${
                  activeTab === i ? "bg-bg-surface" : "bg-bg-surface/60"
                }`}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold text-text-primary">{uc.role}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{uc.title}</p>
                </div>
                <p className="text-xs sm:text-sm font-bold text-text-primary pt-2">
                  {uc.highlight}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
