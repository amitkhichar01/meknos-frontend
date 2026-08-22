import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import useBillingStore from "../../store/useBillingStore";

export default function BillingTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderIdParam = searchParams.get("order_id");

  const {
    billingState,
    isLoading,
    isProcessingCheckout,
    error,
    fetchCurrentBilling,
    initiateProCheckout,
    verifyOrder,
    clearError,
  } = useBillingStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentBilling();
  }, [fetchCurrentBilling]);

  // Handle Cashfree payment return verification if order_id is in URL query params
  useEffect(() => {
    if (orderIdParam) {
      const runVerification = async () => {
        const success = await verifyOrder(orderIdParam);
        if (success) {
          setToastMessage("🎉 Payment verified! Your Pro plan is now ACTIVE.");
        } else {
          setToastMessage("⚠️ Payment verification pending or failed.");
        }
        // Remove order_id from URL query without full reload
        searchParams.delete("order_id");
        setSearchParams(searchParams, { replace: true });
      };
      runVerification();
    }
  }, [orderIdParam, verifyOrder, searchParams, setSearchParams]);

  const isPro = billingState?.status === "ACTIVE";

  const handleUpgradeClick = async () => {
    const result = await initiateProCheckout();
    if (result.error) {
      setToastMessage(`Checkout failed: ${result.error}`);
    }
  };

  const entitlements = billingState?.entitlements;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-bg-inverse text-text-inverse shadow-xl text-sm font-semibold flex items-center justify-between">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="font-bold text-red-500 hover:text-red-700 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-outfit">
          Billing & Subscriptions
        </h1>
        <p className="text-sm text-text-secondary">
          Manage your plan, check feature entitlements, and upgrade your access.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-bg-secondary border border-border-primary rounded-3xl">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full mb-3" />
          <p className="text-sm font-medium text-text-secondary">Loading billing details...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Active Plan Card */}
          <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
                  CURRENT PLAN
                </span>
                <h2 className="text-2xl font-extrabold text-text-primary mt-1 font-outfit">
                  {billingState?.plan?.name || "Free"} Plan
                </h2>
              </div>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  isPro ? "bg-black text-white" : "bg-black/10 text-text-secondary"
                }`}
              >
                {isPro ? "ACTIVE" : "FREE"}
              </span>
            </div>

            <div className="py-2">
              <span className="text-4xl font-extrabold font-outfit text-text-primary">
                {isPro ? `₹${billingState?.price || 499}` : "₹0"}
              </span>
              <span className="text-sm font-medium text-text-secondary"> / month</span>
            </div>

            {isPro ? (
              <div className="space-y-2 text-xs text-text-secondary pt-2 border-t border-border-primary">
                <p>
                  <strong className="text-text-primary">Purchased:</strong>{" "}
                  {billingState?.startedAt
                    ? new Date(billingState.startedAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong className="text-text-primary">Expires On:</strong>{" "}
                  {billingState?.expiresAt
                    ? new Date(billingState.expiresAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ) : (
              <p className="text-xs text-text-secondary leading-relaxed">
                You are currently on the Free plan. Upgrade to Pro for unlimited AI messages and custom tone instructions.
              </p>
            )}

            {!isPro ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleUpgradeClick}
                disabled={isProcessingCheckout}
                className="w-full justify-center"
              >
                {isProcessingCheckout ? "Opening Cashfree..." : "Upgrade to Pro (₹499)"}
              </Button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold text-center">
                ✅ Pro plan active. You have full access to all premium features.
              </div>
            )}
          </div>

          {/* Entitlement Features Checklist Card */}
          <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-text-primary font-outfit">
              Your Plan Entitlements
            </h3>

            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center justify-between text-text-primary">
                <span>💬 AI Messages Allowance</span>
                <span className="font-bold">
                  {entitlements?.limits.aiMessagesPerMonth === null
                    ? "Unlimited"
                    : `${entitlements?.limits.aiMessagesPerMonth || 10} / month`}
                </span>
              </li>
              <li className="flex items-center justify-between text-text-primary">
                <span>🎨 Custom AI Response Tone</span>
                <span className="font-bold">
                  {entitlements?.features.aiTone ? "Enabled ✅" : "Disabled 🔒"}
                </span>
              </li>
              <li className="flex items-center justify-between text-text-primary">
                <span>⚡ Higher LLM Model (Gemini Pro)</span>
                <span className="font-bold">
                  {entitlements?.features.higherLlmModel ? "Enabled ✅" : "Disabled 🔒"}
                </span>
              </li>
              <li className="flex items-center justify-between text-text-primary">
                <span>🏷️ Remove Meknos Branding</span>
                <span className="font-bold">
                  {entitlements?.features.removeBranding ? "Enabled ✅" : "Disabled 🔒"}
                </span>
              </li>
              <li className="flex items-center justify-between text-text-primary">
                <span>📊 Visitor Analytics</span>
                <span className="font-bold">
                  {entitlements?.features.visitorAnalytics ? "Enabled ✅" : "Disabled 🔒"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
