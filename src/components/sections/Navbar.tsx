import React, { useState } from "react";
import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { MenuIcon, CloseIcon } from "../common/Icons";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-md py-4">
      <Container>
        <div className="flex items-center justify-between">
          {/* Left: Logo with Link */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-extrabold text-text-primary"
          >
            <img src="/logo.png" alt="meknos logo" className="w-8 h-8" />

            <span>Meknos</span>
          </a>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="#signin">
              Sign in
            </Button>
            <Button variant="primary" size="sm" href="#create">
              Create your Meknos
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-bg-surface text-text-primary"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-6 bg-bg-surface rounded-2xl flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-text-primary hover:opacity-80 py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Button
                variant="secondary"
                size="md"
                href="#signin"
                className="w-full"
              >
                Sign in
              </Button>
              <Button
                variant="primary"
                size="md"
                href="#create"
                className="w-full"
              >
                Create your Meknos
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
