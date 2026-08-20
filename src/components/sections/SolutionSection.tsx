import Container from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";

export default function SolutionSection() {
  const steps = [
    {
      step: "Step 1",
      title: "Build your profile",
      description:
        "Add your experience, projects, skills, links, and anything else you want people to know about you.",
    },
    {
      step: "Step 3",
      title: "Share your Meknos link",
      description:
        "Add your Meknos link to your portfolio, LinkedIn, resume, email signature, or anywhere people discover you.",
    },
    {
      step: "Step 4",
      title: "Let people ask",
      description:
        "Visitors can ask what they want to know and get relevant answers from the information you've shared.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="How it works"
            heading="Three steps between you and your next client"
          />

          {/* 4 Steps Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item) => (
              <Card
                key={item.step}
                className=" relative flex flex-col justify-between space-y-4"
              >
                <p className="inline-block absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-bg-inverse text-text-inverse mb-3">
                  {item.step}
                </p>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { SolutionSection };
