import Container from "../common/Container";
import Button from "../common/Button";
import { ArrowRightIcon, PlayIcon } from "../common/Icons";

export default function HeroSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 text-center">
      <Container>
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-text-primary font-outfit">
            Make it easier for clients to choose you
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-text-secondary font-normal max-w-3xl leading-relaxed">
            One place for your work, experience, and links. Potential clients
            can ask questions and get the answers they need before they reach
            out.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2">
            <Button
              variant="primary"
              size="lg"
              to="/login"
              icon={<ArrowRightIcon />}
            >
              Get started for free
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="#features"
              icon={<PlayIcon className="w-4 h-4" />}
            >
              Explore features
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
