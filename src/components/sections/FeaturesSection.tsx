import React from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      num: "01",
      title: "Your Personal AI",
      description:
        "Give your AI the information you want people to know about you. It can answer questions about your background, skills, experience, projects, and professional interests.",
      highlight: "Make your profile conversational.",
    },
    {
      num: "02",
      title: "One Shareable Link",
      description:
        "Get a simple personal URL that you can share anywhere. Use it on your resume, LinkedIn, GitHub, email signature, social media, or portfolio.",
      highlight: "One link can represent your professional identity everywhere.",
    },
    {
      num: "03",
      title: "Your Information, Your Control",
      description:
        "You decide what information goes into your Meknos profile. Add, update, or remove information whenever your work and experience change.",
      highlight: "Keep your AI profile as current as you are.",
    },
    {
      num: "04",
      title: "Projects That Tell Their Own Story",
      description:
        "Add your projects with descriptions, technologies, links, and other relevant details. Visitors can ask questions and discover the work that matters to them.",
      highlight: "Turn a project list into something people can explore.",
    },
    {
      num: "05",
      title: "Professional Context",
      description:
        "Meknos isn't limited to a list of skills. Add your experience, education, achievements, services, interests, links, and other professional context.",
      highlight: "Give people the bigger picture.",
    },
    {
      num: "06",
      title: "Conversation History",
      description:
        "Visitors can continue their conversation instead of asking the same question repeatedly. Meknos keeps the conversation flowing so they can learn more naturally.",
      highlight: "Less searching. More meaningful conversations.",
    },
    {
      num: "07",
      title: "Built for Your Professional Identity",
      description:
        "Whether you're a developer, freelancer, designer, consultant, creator, founder, or student, Meknos gives you a simple way to present what you do.",
      highlight: "Your career changes. Your profile can change with it.",
    },
    {
      num: "08",
      title: "Share Anywhere",
      description:
        "Your Meknos profile can become part of your existing online presence: LinkedIn, GitHub, Resume, Portfolio, Email, Social media.",
      highlight: "One link connects them all.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="Everything your profile needs"
            heading="More than a profile. A professional AI presence."
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <Card key={feat.num} className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-sm font-extrabold text-text-secondary opacity-60">
                    Feature {feat.num}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="pt-3">
                  <p className="text-xs sm:text-sm font-bold text-text-primary">
                    {feat.highlight}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
