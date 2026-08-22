import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

// layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// page components
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import TermsOfService from "./components/policies/TermsOfService";
import RefundPolicy from "./components/policies/RefundPolicy";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import PublicProfilePage from "./components/pages/PublicProfilePage";
import VerifyBillingPage from "./components/pages/VerifyBillingPage";

import DashboardLayout from "./components/layout/DashboardLayout";
import BillingTab from "./components/dashboard/BillingTab";
import PaymentHistoryTab from "./components/dashboard/PaymentHistoryTab";
import SubscriptionHistoryTab from "./components/dashboard/SubscriptionHistoryTab";
import AnalyticsTab from "./components/dashboard/AnalyticsTab";

import useAuthStore from "./store/useAuthStore";
import { loadGoogleScript, GOOGLE_CLIENT_ID } from "./utils/googleAuth";

// function ProtectedRoute() {
//   const { isAuthenticated, isInitialized } = useAuthStore();

//   if (!isInitialized) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <div className="animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }

function ScrollToTopAndHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function AppContent() {
  const { isAuthenticated, isInitialized, fetchCurrentUser, loginWithGoogle } =
    useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const hasAttemptedPromptRef = useRef(false);

  // 1. Refetch user details from backend on app load
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // 2. Google Auth Login Popup on Home Page
  useEffect(() => {
    const isHomePage = location.pathname === "/";

    if (
      isInitialized &&
      !isAuthenticated &&
      isHomePage &&
      !hasAttemptedPromptRef.current
    ) {
      hasAttemptedPromptRef.current = true;

      const triggerHomePageGooglePrompt = async () => {
        try {
          await loadGoogleScript();
          if (window.google?.accounts?.id && GOOGLE_CLIENT_ID) {
            window.google.accounts.id.initialize({
              client_id: GOOGLE_CLIENT_ID,
              callback: async (response) => {
                if (response.credential) {
                  await loginWithGoogle(response.credential);
                }
              },
              cancel_on_tap_outside: false,
            });

            window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed()) {
                console.log(
                  "Google Prompt not displayed:",
                  notification.getNotDisplayedReason(),
                );
              } else if (notification.isSkippedMoment()) {
                console.log(
                  "Google Prompt skipped:",
                  notification.getSkippedReason(),
                );
              }
            });
          }
        } catch (err) {
          console.error("Failed to trigger home page Google popup:", err);
        }
      };

      triggerHomePageGooglePrompt();
    }
  }, [isInitialized, isAuthenticated, location.pathname, loginWithGoogle]);

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <ScrollToTopAndHash />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicy onBack={navigateToHome} />}
          />
          <Route
            path="/terms"
            element={<TermsOfService onBack={navigateToHome} />}
          />
          <Route
            path="/refund"
            element={<RefundPolicy onBack={navigateToHome} />}
          />
          <Route path="/billing/verify" element={<VerifyBillingPage />} />
        </Route>

        {/*dashboard routes*/}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/billing" element={<BillingTab />} />
          <Route path="/dashboard/payments" element={<PaymentHistoryTab />} />
          <Route
            path="/dashboard/subscriptions"
            element={<SubscriptionHistoryTab />}
          />
          <Route path="/dashboard/analytics" element={<AnalyticsTab />} />
        </Route>

        <Route
          path="/in/:username"
          element={<PublicProfilePage onNavigateHome={navigateToHome} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
