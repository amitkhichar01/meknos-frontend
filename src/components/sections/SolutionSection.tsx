import React from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Build your profile",
      description:
        "Add your professional information, skills, experience, projects, social links, contact details, and anything else you want people to know.",
    },
    {
      step: "Step 2",
      title: "Meknos creates your AI profile",
      description:
        "Your information becomes the knowledge behind your personal AI assistant.",
    },
    {
      step: "Step 3",
      title: "Share one link",
      description:
        "Add your Meknos link to your portfolio, LinkedIn, resume, email signature, social profiles, or anywhere else.",
    },
    {
      step: "Step 4",
      title: "Let visitors ask",
      description:
        "Visitors can ask questions about you and your work and get answers based on the information you've provided.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-bg-surface/30">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="How it works"
            heading="Give people answers, not another page to scroll."
          />

          {/* 4 Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <Card key={item.step} className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-bg-inverse text-text-inverse mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Final Statement */}
          <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface text-center">
            <p className="text-lg sm:text-xl font-bold text-text-primary">
              You provide the information. Meknos makes it conversational.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
