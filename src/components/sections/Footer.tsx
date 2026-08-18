import React from "react";
import { Container } from "../common/Container";

export const Footer: React.FC = () => {
  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "How it works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ];

  const companyLinks = [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Refund Policy", href: "#refund" },
  ];

  return (
    <footer className="bg-bg-surface py-16 text-text-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <a
              href="#"
              className="flex items-center gap-2 text-2xl font-extrabold"
            >
              <img
                src="/logo.png"
                alt="meknos logo"
                className="w-8 h-8"
              />
              <span>Meknos</span>
            </a>
            <p className="text-base font-bold text-text-primary">
              Your professional identity, now conversational.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Meknos helps professionals turn their online profile into an
              AI-powered experience that people can explore through
              conversation.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Product
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-secondary">
          <p>© 2026 Meknos. All rights reserved.</p>
          <p className="font-bold text-text-primary">
            Built for people who have more to say than a résumé can fit.
          </p>
        </div>
      </Container>
    </footer>
  );
};
