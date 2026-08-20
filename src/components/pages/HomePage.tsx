import { HeroDemoVideoSection } from "../sections/HeroDemoVideoSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";
import { FaqSection } from "../sections/FaqSection";
import { HeroSection } from "../sections/HeroSection";
import { PricingSection } from "../sections/PricingSection";
import { SolutionSection } from "../sections/SolutionSection";

export default function HomePage() {
  return (
    <>
      <main className="z-10">
        <HeroSection />
        <HeroDemoVideoSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <div className="flex h-screen w-full justify-evenly fixed top-0 -z-10 select-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="relative h-full w-px bg-border-primary/20">
            <div
              className="absolute left-1/2 h-2 w-full -translate-x-1/2 bg-[#5073ff]"
              style={{
                animation: `lineMove 10s linear infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
