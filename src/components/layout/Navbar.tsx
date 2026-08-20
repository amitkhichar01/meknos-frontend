import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import useAuthStore from "../../store/useAuthStore";
import Logo from "../common/Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "How it works", sectionId: "how-it-works" },
    { name: "Features", sectionId: "features" },
    { name: "Pricing", sectionId: "pricing" },
    { name: "FAQ", sectionId: "faq" },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
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
    <header className="sticky top-0 z-50 bg-bg-primary backdrop-blur-md py-4 border-b border-border-primary ">
      <Container>
        <div className="flex items-center justify-between">
          {/* Left: Logo with Link */}
          <Logo />

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right: CTA / Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bg-secondary hover:opacity-80 transition-all border border-border-primary cursor-pointer"
                >
                  {user.profileUrl ? (
                    <img
                      src={user.profileUrl}
                      alt={user.fullName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-text-primary text-text-inverse flex items-center justify-center text-xs font-bold">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-text-primary max-w-[120px] truncate">
                    {user.fullName}
                  </span>
                  <svg
                    className={`w-4 h-4 text-text-secondary transition-transform ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-bg-primary border border-border-primary rounded-2xl shadow-xl pt-1 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-border-primary">
                      <p className="text-sm font-bold text-text-primary truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary font-semibold"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" to="/login">
                  Sign in
                </Button>
                <Button variant="primary" size="sm" to="/login">
                  Create your Meknos
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div
            className={`${mobileMenuOpen ? "opened" : ""} z-60 flex cursor-pointer border-none bg-transparent md:hidden`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Main Menu"
          >
            <svg width="30" height="30" viewBox="0 0 100 100">
              <path
                className="line line1 stroke-line"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />

              <path className="line line2 stroke-line" d="M 20,50 H 80" />

              <path
                className="line line3 stroke-line"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-11 right-0 z-10 w-full md:hidden mt-2 p-6 bg-bg-primary flex flex-col space-y-4 border-b border-border-primary"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="text-left text-base font-semibold text-text-primary hover:opacity-80 py-1 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 flex flex-col space-y-3 border-t border-border-primary">
                {isAuthenticated && user ? (
                  <>
                    {/* User Profile */}
                    <div className="rounded-xl border border-border-primary bg-bg-surface p-3">
                      <div className="flex items-center gap-3">
                        {user.profileUrl ? (
                          <img
                            src={user.profileUrl}
                            alt={user.fullName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text-primary text-sm font-bold text-text-inverse">
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text-primary">
                            {user.fullName}
                          </p>

                          <p className="truncate text-xs text-text-secondary">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-3 space-y-1">
                      <Button
                        variant="secondary"
                        size="md"
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full justify-start px-3 py-2.5 text-sm font-semibold"
                      >
                        Dashboard
                      </Button>

                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          logout();
                        }}
                        className="w-full justify-start px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      size="md"
                      to="/login"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      to="/login"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create your Meknos
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
