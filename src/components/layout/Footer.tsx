import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Logo from "../common/Logo";
import { siteConfig } from "../../config/site";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const productLinks = [
    { name: "Features", sectionId: "features" },
    { name: "Pricing", sectionId: "pricing" },
    { name: "How it works", sectionId: "how-it-works" },
    { name: "FAQ", sectionId: "faq" },
  ];

  const companyLinks = [
    // { name: "About", href: "/#about" },
    { name: "Contact", href: `mailto:${siteConfig.supportEmail}` },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-bg-secondary py-16 mt-16 text-text-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <Logo />

            <p className="text-base font-bold text-text-primary">
              Your professional identity, now conversational.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Meknos turns your profile into a place where people can ask
              questions, discover what they need and understand what you do.
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
                  <button
                    onClick={() => handleNavClick(link.sectionId)}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
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
                  {link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} Meknos. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
