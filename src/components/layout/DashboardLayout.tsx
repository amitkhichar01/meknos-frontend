import { useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../common/Container";
import Logo from "../common/Logo";
import useAuthStore from "../../store/useAuthStore";
import useBillingStore from "../../store/useBillingStore";
import Footer from "./Footer";

const navItems = [
  {
    label: "My Profile",
    path: "/dashboard",
    exact: true,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    label: "Billing & Plans",
    path: "/dashboard/billing",
    exact: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Payment History",
    path: "/dashboard/payments",
    exact: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    label: "Subscription History",
    path: "/dashboard/subscriptions",
    exact: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Visitor Analytics",
    path: "/dashboard/analytics",
    exact: false,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isInitialized, logout } = useAuthStore();
  const { billingState, fetchCurrentBilling } = useBillingStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    fetchCurrentBilling();
  }, [fetchCurrentBilling]);

  // Live time clock update every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  if (!isInitialized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isProActive = billingState?.status === "ACTIVE";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-bg-primary backdrop-blur-md border-b border-border-primary py-3 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-7xl flex items-center justify-between">
          {/* Left Side: Product Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Right Side: Live Clock & Togglable Mobile Menu Icon */}
          <div className="flex items-center gap-3">
            {/* Live Clock Display */}
            {currentTime && (
              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-bg-secondary border border-border-primary text-text-primary shadow-xs">
                <svg
                  className="w-4 h-4 text-text-secondary animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-mono tracking-tight">{currentTime}</span>
              </div>
            )}

            {/* Menu icon togglable on right side (< sm screen) */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="sm:hidden p-2 rounded-xl bg-bg-secondary border border-border-primary text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileSidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Main Content & Sidebar Layout */}
      <div className="min-h-[calc(100vh-65px)] bg-bg-primary text-text-primary pt-6 sm:pt-10">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
            {/* Desktop Left Sidebar (>= sm screens) */}
            <aside className="hidden sm:flex sm:col-span-4 lg:col-span-3 flex-col justify-between bg-bg-secondary border border-border-primary rounded-3xl p-5 shadow-sm min-h-[calc(100vh-140px)] sticky top-24 backdrop-blur-md">
              <div className="space-y-6">
                {/* Dashboard Navigation Links */}
                <nav className="space-y-1.5">
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider px-3 pb-1">
                    Navigation
                  </p>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-bg-inverse text-text-inverse shadow-sm"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-primary"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Pro Access Banner */}
                {!isProActive && (
                  <div className="pt-2">
                    <div className="p-4 rounded-2xl bg-bg-inverse text-text-inverse space-y-3 shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-black rounded-md uppercase">
                          PRO ACCESS
                        </span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Unlock unlimited AI messages, custom AI response tone,
                        and higher LLM model.
                      </p>
                      <NavLink
                        to="/dashboard/billing"
                        className="block text-center w-full py-2 px-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors"
                      >
                        Upgrade for ₹499
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Logout Button (Left Sidebar) */}
              <div className="pt-6 border-t border-border-primary mt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Display Outlet */}
            <main className="sm:col-span-8 lg:col-span-9 space-y-6">
              <Outlet />
            </main>
          </div>
        </Container>
      </div>

      {/* Mobile Slide-in Drawer from Right (< sm screen) */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs sm:hidden"
            />

            {/* Right Sliding Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-bg-secondary border-l border-border-primary p-6 shadow-2xl flex flex-col justify-between overflow-y-auto sm:hidden"
            >
              <div className="space-y-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-border-primary">
                  {/* User Info inside drawer */}
                  <div className="flex items-center gap-3">
                    {user?.profileUrl ? (
                      <img
                        src={user.profileUrl}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full border border-border-primary object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-text-primary text-text-inverse flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {user?.fullName?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-text-primary truncate font-outfit">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-xl bg-bg-primary border border-border-primary text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Nav Links inside drawer */}
                <nav className="space-y-1.5">                 
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-bg-inverse text-text-inverse shadow-sm"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-primary"
                        }`
                      }
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Pro Access Banner inside drawer */}
                {!isProActive && (
                  <div className="pt-2">
                    <div className="p-4 rounded-2xl bg-bg-inverse text-text-inverse space-y-3 shadow-md">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-black rounded-md uppercase">
                        PRO ACCESS
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed">
                        Unlock unlimited AI messages, custom AI response tone,
                        and higher LLM model.
                      </p>
                      <NavLink
                        to="/dashboard/billing"
                        onClick={() => setMobileSidebarOpen(false)}
                        className="block text-center w-full py-2 px-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors"
                      >
                        Upgrade for ₹499
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Logout Button (Mobile Drawer) */}
              <div className="pt-6 border-t border-border-primary mt-6">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-sm font-bold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
