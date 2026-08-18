import React from "react";
import { Container } from "../common/Container";
import { Eyebrow } from "../common/Eyebrow";
import { Button } from "../common/Button";
import { ArrowRightIcon, PlayIcon } from "../common/Icons";

export const HeroSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-28 text-center">
      <Container>
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <Eyebrow>Your profile, now interactive.</Eyebrow>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
            Turn your profile into an AI that can talk about you.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary font-normal max-w-3xl leading-relaxed">
            Create your personal AI profile with your experience, skills, projects, links, and
            professional information. Share one simple link and let anyone ask questions about
            you, your work, or what you can offer.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2">
            <Button variant="primary" size="lg" href="#create" icon={<ArrowRightIcon />}>
              Create your Meknos
            </Button>
            <Button variant="secondary" size="lg" href="#demo" icon={<PlayIcon className="w-4 h-4" />}>
              See how it works
            </Button>
          </div>

          {/* Supporting Text Card */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-bg-surface max-w-2xl text-center space-y-3">
            <p className="text-sm sm:text-base text-text-secondary">
              No complicated website. No repeated introductions. No endless scrolling through your
              portfolio.
            </p>
            <p className="text-base sm:text-lg font-bold text-text-primary">
              One link. One profile. One AI that represents you.
            </p>
          </div>

          {/* Hero Trust/Support Text */}
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-text-secondary uppercase pt-4">
            Built for developers, freelancers, creators, consultants, founders, and professionals.
          </p>
        </div>
      </Container>
    </section>
  );
};
