import React from "react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { ArrowRightIcon } from "../common/Icons";

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="p-10 sm:p-16 lg:p-20 rounded-3xl bg-bg-inverse text-text-inverse text-center max-w-5xl mx-auto space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Stop sending people to a static profile.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 leading-relaxed pt-2">
              Give them a profile they can actually talk to. Create your Meknos, add your
              information, and share one link with the people who need to know about you.
            </p>
          </div>

          <div className="pt-4 flex flex-col items-center space-y-4">
            <Button
              variant="primary"
              size="lg"
              href="#create"
              icon={<ArrowRightIcon />}
              className="!bg-bg-surface !text-text-inverse hover:!opacity-80 px-10 py-5 text-lg"
            >
              Create your Meknos
            </Button>
            <p className="text-sm font-bold tracking-wide uppercase opacity-80 pt-2">
              Your professional identity, now conversational.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
