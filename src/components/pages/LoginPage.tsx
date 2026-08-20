import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import useAuthStore from "../../store/useAuthStore";
import { loadGoogleScript, GOOGLE_CLIENT_ID } from "../../utils/googleAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, error, loginWithGoogle, clearError } =
    useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let isMounted = true;

    const setupGoogleBtn = async () => {
      try {
        await loadGoogleScript();
        if (!isMounted || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            if (response.credential) {
              await loginWithGoogle(response.credential);
            }
          },
        });

        const container = document.getElementById("google-signin-btn");
        if (container) {
          container.innerHTML = "";
          window.google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            width: 280,
            text: "continue_with",
            shape: "pill",
          });
        }
      } catch (err) {
        console.error("Failed to setup Google button:", err);
      }
    };

    if (!isAuthenticated) {
      setupGoogleBtn();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, loginWithGoogle]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        {/* Auth Card */}
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
          {/* Top Decorative Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-black/5 mb-2">
              <img
                src="/logo.webp"
                alt="Meknos logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Sign in to Meknos
            </h1>
            <p className="text-sm text-text-secondary">
              Create and manage your AI-powered personal profile in one click
            </p>
          </div>
          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          <div className="space-y-6 flex flex-col items-center">
            {/* Google Button Container */}
            <div className="w-full flex justify-center py-2 min-h-[44px]">
              <div id="google-signin-btn" />
            </div>

            <p className="text-xs text-center text-text-secondary leading-relaxed pt-4">
              By continuing, you agree to Meknos's{" "}
              <Link to="/terms" className="underline hover:text-text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
