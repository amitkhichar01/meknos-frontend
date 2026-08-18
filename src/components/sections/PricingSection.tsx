import React from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { CheckIcon } from "../common/Icons";

export const PricingSection: React.FC = () => {
  const freeFeatures = [
    "Personal Meknos profile",
    "Shareable profile link",
    "AI-powered conversations",
    "Basic profile information",
    "Projects and skills",
    "Social links",
    "Basic customization",
  ];

  const proFeatures = [
    "Everything in Free",
    "More AI conversations",
    "Advanced profile customization",
    "More profile content",
    "Advanced analytics",
    "Visitor insights",
    "Priority features",
    "Additional professional tools",
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="Simple pricing"
            heading="Start free. Upgrade when you need more."
            description="Build your professional AI profile without committing to another expensive tool."
          />

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            {/* Free Plan */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-surface p-8 sm:p-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-text-primary">
                    Free
                  </h3>
                  <p className="text-sm text-text-secondary">
                    For getting started with your personal AI profile.
                  </p>
                </div>

                <div className="py-2">
                  <span className="text-4xl sm:text-5xl font-black text-text-primary">
                    ₹0
                  </span>
                  <span className="text-base font-semibold text-text-secondary">
                    {" "}
                    / month
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    Includes
                  </p>
                  <ul className="space-y-3">
                    {freeFeatures.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-text-primary"
                      >
                        <span className="p-1 rounded-full bg-bg-primary text-text-primary">
                          <CheckIcon className="w-3.5 h-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                href="#create"
                className="w-full"
              >
                Get started free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-surface p-8 sm:p-10">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-text-primary">
                      Pro
                    </h3>
                    <p className="text-sm text-text-secondary">
                      For professionals who want more control and visibility.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-bg-surface ">
                    Popular
                  </span>
                </div>

                <div className="py-2">
                  <span className="text-4xl sm:text-5xl font-black ">₹ 699</span>
                  <span className="text-base font-semibold opacity-80">
                    {" "}
                    / month
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Includes
                  </p>
                  <ul className="space-y-3">
                    {proFeatures.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm "
                      >
                        <span className="p-1 rounded-full bg-bg-surface ">
                          <CheckIcon className="w-3.5 h-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                href="#upgrade"
                className="w-full"
              >
                Upgrade to Pro
              </Button>
            </Card>
          </div>

          {/* Pricing Footnote */}
          <div className="text-center max-w-2xl mx-auto pt-4">
            <p className="text-sm sm:text-base font-semibold text-text-secondary">
              No long-term commitment. Upgrade when Meknos becomes part of your
              workflow.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
