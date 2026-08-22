import { useNavigate } from "react-router-dom";
import Container from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";
import Button from "../common/Button";
import { CheckIcon } from "../common/Icons";
import useAuthStore from "../../store/useAuthStore";
import useBillingStore from "../../store/useBillingStore";

export default function PricingSection() {
  const { isAuthenticated } = useAuthStore();
  const { initiateProCheckout, isProcessingCheckout } = useBillingStore();
  const navigate = useNavigate();

  const freeFeatures = [
    "Personal Meknos profile",
    "Shareable profile link",
    "10 AI messages per month",
    "Standard profile customization",
    "Suggested conversation starters",
  ];

  const proFeatures = [
    "Everything in Free",
    "Unlimited AI messages per month",
    "AI responses in your custom tone",
    "Higher LLM model (Gemini Pro)",
    "Remove Meknos branding from profile",
    "Visitor analytics & insights",
    "One-time payment for 1 month access",
  ];

  const handleProClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const result = await initiateProCheckout();
    if (result.success) {
      console.log("Pro checkout initiated successfully.");
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="Pricing"
            heading="Simple, transparent pricing"
            description="Start free. Upgrade to Pro when you need unlimited AI messages & custom tone."
          />

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-4">
            {/* Free Plan Card */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-secondary p-8 sm:p-10 border border-border-primary">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-text-primary font-outfit">
                    Free
                  </h3>
                  <div className="py-2">
                    <span className="text-4xl sm:text-5xl font-extrabold font-outfit text-text-primary">
                      ₹0
                    </span>
                    <span className="text-base font-semibold text-text-secondary">
                      {" "}
                      / month
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  Everything you need to get started with your personal AI profile.
                </p>

                <div className="space-y-3 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
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
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="w-full justify-center"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get started free"}
              </Button>
            </Card>

            {/* Pro Plan Card */}
            <Card className="flex flex-col justify-between space-y-8 bg-bg-inverse text-text-inverse p-8 sm:p-10 border border-white/10 shadow-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-white font-outfit">
                      Pro
                    </h3>
                    <div className="py-2">
                      <span className="text-4xl sm:text-5xl font-extrabold font-outfit text-white">
                        ₹499
                      </span>
                      <span className="text-base font-semibold text-white/60">
                        {" "}
                        / 1 month access
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-black">
                    Popular
                  </span>
                </div>
                <p className="text-sm text-white/70">
                  For professionals who want unlimited AI messages, custom tone, and higher model access.
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
                onClick={handleProClick}
                disabled={isProcessingCheckout}
                className="w-full bg-white text-black hover:bg-gray-100 border-none justify-center"
              >
                {isProcessingCheckout ? "Opening Cashfree..." : "Upgrade to Pro"}
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { PricingSection };
