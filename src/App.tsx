import React, { useState, useEffect } from "react";
import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { HeroDemoVideoSection } from "./components/sections/HeroDemoVideoSection";
import { ProblemSection } from "./components/sections/ProblemSection";
import { SolutionSection } from "./components/sections/SolutionSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { UseCasesSection } from "./components/sections/UseCasesSection";
import { PricingSection } from "./components/sections/PricingSection";
import { FaqSection } from "./components/sections/FaqSection";
import { FinalCtaSection } from "./components/sections/FinalCtaSection";
import { Footer } from "./components/sections/Footer";
import { PrivacyPolicy } from "./components/policies/PrivacyPolicy";
import { TermsOfService } from "./components/policies/TermsOfService";
import { RefundPolicy } from "./components/policies/RefundPolicy";

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = "";
    setCurrentRoute("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    switch (currentRoute) {
      case "#privacy":
        return <PrivacyPolicy onBack={navigateToHome} />;
      case "#terms":
        return <TermsOfService onBack={navigateToHome} />;
      case "#refund":
        return <RefundPolicy onBack={navigateToHome} />;
      default:
        return (
          <main>
            {/* 2. Hero Section */}
            <HeroSection />

            {/* 3. Hero Demo Video */}
            <HeroDemoVideoSection />

            {/* 4. What Problem Does Meknos Solve? */}
            <ProblemSection />

            {/* 5. How Meknos Solves It */}
            <SolutionSection />

            {/* 6. Features */}
            <FeaturesSection />

            {/* 7. Feature Showcase / Use Cases */}
            <UseCasesSection />

            {/* 8. Pricing */}
            <PricingSection />

            {/* 9. FAQ */}
            <FaqSection />

            {/* 10. Final CTA */}
            <FinalCtaSection />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-bg-inverse selection:text-text-inverse flex flex-col justify-between">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Render View */}
      {renderContent()}

      {/* 11. Footer */}
      <Footer />
    </div>
  );
};

export default App;
