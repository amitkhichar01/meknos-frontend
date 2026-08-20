import React from "react";
import Container from "../common/Container";
import Button from "../common/Button";
import { Eyebrow } from "../common/Eyebrow";
import { ArrowLeftIcon } from "../common/Icons";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  lastUpdated,
  onBack,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Actions & Header */}
          <div className="space-y-4">
            <div>
              {onBack ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onBack}
                  icon={<ArrowLeftIcon />}
                  className="cursor-pointer"
                >
                  Back to Home
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  href="/"
                  icon={<ArrowLeftIcon />}
                >
                  Back to Home
                </Button>
              )}
            </div>

            <div className="pt-2 flex flex-col items-start space-y-3">
              <Eyebrow>Last Updated: {lastUpdated}</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Policy Document Content Card */}
          <div className="space-y-8 text-sm sm:text-base leading-relaxed">
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}

export { PolicyLayout };
