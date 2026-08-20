import Container from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Card } from "../common/Card";
import { siteConfig } from "../../config/site";

export default function FeaturesSection() {
  const features = [
    {
      num: "01",
      title: "Let People Ask",
      description:
        "Visitors ask questions in their own words and get relevant answers from your profile.",
      highlight: "Ask, don't search.",
    },
    {
      num: "02",
      title: "Share One Link",
      description:
        "Bring your work, experience, projects, and links into one place you can share anywhere.",
      highlight: "One link. Everything that matters.",
    },
    {
      num: "03",
      title: "Stay in Control",
      description:
        "Choose what you share and update your profile whenever your work changes.",
      highlight: "Your information. Your control.",
    },
    {
      num: "04",
      title: "Always Stay Current",
      description:
        "Update your profile once and keep the information visitors see up to date.",
      highlight: "One update keeps everything current.",
    },
    {
      num: "05",
      title: "Understand Your Visitors",
      description:
        "See what visitors ask and learn what they actually want to know about you.",
      highlight: "Turn questions into insights.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="Features"
            heading="A better way to present yourself"
          />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 01: Hero Bento Card (Spans 2 columns on desktop) */}
            <Card className="lg:col-span-2 flex flex-col justify-between overflow-hidden relative group border border-border-primary/30 hover:border-border-primary/60 transition-all duration-300 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-border-primary/40">
                    Feature {features[0].num}
                  </span>
                  <span className="text-xs font-semibold text-text-secondary opacity-75">
                    Interactive Q&amp;A
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                    {features[0].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                    {features[0].description}
                  </p>
                </div>

                {/* Visual Q&A Preview Box */}
                <div className="mt-6 rounded-2xl bg-bg-primary p-4 sm:p-5 border border-border-primary/30 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-medium text-text-secondary bg-bg-secondary/60 rounded-xl p-2.5 border border-border-primary/20">
                    <svg
                      className="w-4 h-4 text-text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-text-primary font-semibold">
                      &quot;What projects have you worked on recently?&quot;
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-xs bg-bg-secondary/40 rounded-xl p-3 border border-border-primary/10">
                    <div className="w-5 h-5 rounded-full bg-bg-inverse text-text-inverse flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      M
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      &quot;Built a real-time conversational portfolio platform, 2 web apps with React &amp; Tailwind, and custom APIs.&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-primary/20 mt-6 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {features[0].highlight}
                </span>
              
              </div>
            </Card>

            {/* Feature 02: Share One Link */}
            <Card className="lg:col-span-1 flex flex-col justify-between overflow-hidden relative group border border-border-primary/30 hover:border-border-primary/60 transition-all duration-300 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-border-primary/40">
                    Feature {features[1].num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    {features[1].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {features[1].description}
                  </p>
                </div>

                {/* Visual URL Pill Box */}
                <div className="mt-4 rounded-xl bg-bg-primary p-3 border border-border-primary/30 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <svg
                      className="w-4 h-4 text-text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <span className="text-xs font-mono font-bold text-text-primary truncate">
                      {siteConfig.url}/yourname
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-bg-inverse text-text-inverse rounded-md shrink-0">
                    Copy
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border-primary/20 mt-6">
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {features[1].highlight}
                </span>
              </div>
            </Card>

            {/* Feature 03: Stay in Control */}
            <Card className="lg:col-span-1 flex flex-col justify-between overflow-hidden relative group border border-border-primary/30 hover:border-border-primary/60 transition-all duration-300 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-border-primary/40">
                    Feature {features[2].num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    {features[2].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {features[2].description}
                  </p>
                </div>

                {/* Visual Controls / Toggles */}
                <div className="mt-4 rounded-xl bg-bg-primary p-3 border border-border-primary/30 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-medium">Public Profile</span>
                    <span className="w-7 h-4 bg-bg-inverse rounded-full flex items-center justify-end px-0.5">
                      <span className="w-3 h-3 bg-bg-primary rounded-full"></span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border-primary/10">
                    <span className="text-text-secondary font-medium">AI Answers</span>
                    <span className="w-7 h-4 bg-bg-inverse rounded-full flex items-center justify-end px-0.5">
                      <span className="w-3 h-3 bg-bg-primary rounded-full"></span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-primary/20 mt-6">
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {features[2].highlight}
                </span>
              </div>
            </Card>

            {/* Feature 04: Always Stay Current */}
            <Card className="lg:col-span-1 flex flex-col justify-between overflow-hidden relative group border border-border-primary/30 hover:border-border-primary/60 transition-all duration-300 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-border-primary/40">
                    Feature {features[3].num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    {features[3].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {features[3].description}
                  </p>
                </div>

                {/* Visual Live Sync Status Pill */}
                <div className="mt-4 rounded-xl bg-bg-primary p-3 border border-border-primary/30 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-text-primary">Live Sync</span>
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">Auto-updated</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border-primary/20 mt-6">
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {features[3].highlight}
                </span>
              </div>
            </Card>

            {/* Feature 05: Understand Your Visitors */}
            <Card className="lg:col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between overflow-hidden relative group border border-border-primary/30 hover:border-border-primary/60 transition-all duration-300 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg-primary text-text-secondary border border-border-primary/40">
                    Feature {features[4].num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">
                    {features[4].title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {features[4].description}
                  </p>
                </div>

                {/* Visual Visitor Analytics Preview */}
                <div className="mt-4 rounded-xl bg-bg-primary p-3 border border-border-primary/30 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary truncate max-w-[140px]">&quot;What rates do you charge?&quot;</span>
                    <span className="font-bold text-text-primary bg-bg-secondary px-1.5 py-0.5 rounded text-[10px]">54 asks</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border-primary/10">
                    <span className="text-text-secondary truncate max-w-[140px]">&quot;Are you open to full-time?&quot;</span>
                    <span className="font-bold text-text-primary bg-bg-secondary px-1.5 py-0.5 rounded text-[10px]">38 asks</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-primary/20 mt-6">
                <span className="text-xs sm:text-sm font-bold text-text-primary">
                  {features[4].highlight}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { FeaturesSection };
