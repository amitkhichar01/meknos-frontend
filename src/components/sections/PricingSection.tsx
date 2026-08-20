import Container from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";
import Button from "../common/Button";
import { CheckIcon } from "../common/Icons";

export default function PricingSection() {
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
            eyebrow="Pricing"
            heading="Simple, transparent pricing"
            description="Start free. Upgrade when you need more"
          />

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            {/* Free Plan */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-secondary p-8 sm:p-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-text-primary">
                    Free
                  </h3>
                  <div className="py-2">
                    <span className="text-4xl sm:text-5xl font-outfit text-text-primary">
                      ₹0
                    </span>
                    <span className="text-base font-semibold text-text-secondary">
                      {" "}
                      / month
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  Everything you need to get started with your personal AI
                  profile.
                </p>

                <div className="space-y-3 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Includes
                  </p>
                  <ul className="space-y-3">
                    {freeFeatures.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 ml-2 text-sm text-text-primary"
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
                to="/login"
                className="w-full"
              >
                Get started free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-inverse text-text-inverse p-8 sm:p-10 border border-white/10 shadow-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white">
                      Pro
                    </h3>
                    <div className="py-2">
                      <span className="text-4xl sm:text-5xl font-outfit text-white">
                        ₹699
                      </span>
                      <span className="text-base font-semibold text-white/60">
                        {" "}
                        / month
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-black">
                    Popular
                  </span>
                </div>
                <p className="text-sm text-white/70">
                  For professionals who want more control over their profile and
                  how people discover them.
                </p>

                <div className="space-y-3 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Includes
                  </p>
                  <ul className="space-y-3">
                    {proFeatures.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm ml-2 text-white"
                      >
                        <span className="p-1 rounded-full bg-white/15 text-white">
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
                to="/login"
                className="w-full bg-white text-black hover:bg-gray-100 border-none"
              >
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { PricingSection };
