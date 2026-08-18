import React from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      number: "01",
      title: "Static profiles don't answer questions",
      description:
        "Your portfolio shows what you choose to display. Visitors still have to figure out what is relevant to them.",
    },
    {
      number: "02",
      title: "People don't have time to explore everything",
      description:
        "Recruiters, clients, and potential collaborators often spend only a short time evaluating a profile.",
    },
    {
      number: "03",
      title: "You repeat the same information constantly",
      description:
        "The same questions appear again and again: “What do you do?” “What technologies do you use?” “Have you built something like this?” “Can I work with you?”",
    },
    {
      number: "04",
      title: "Your work gets buried",
      description:
        "Your best projects, experience, and skills can easily get lost inside a long portfolio or scattered across different platforms.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="The problem"
            heading="Your portfolio gives information. People still have questions."
            description="A traditional portfolio is built for browsing. But when someone is interested in working with you, they usually want specific answers. They might want to know about your experience, find a relevant project, understand your skills, check whether you are available for a certain type of work, or simply figure out if you're the right person to contact. That usually means more scrolling, more searching, and sometimes another message just to ask something that was already somewhere on your website."
          />

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
            {problems.map((prob) => (
              <Card key={prob.number} className="flex flex-col space-y-4">
                <span className="text-3xl font-extrabold text-text-secondary opacity-60">
                  {prob.number}.
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                  {prob.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  {prob.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Transition Heading Callout Box */}
          <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-bg-inverse text-text-inverse text-center">
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Meknos turns your profile into something people can actually talk to.
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};
