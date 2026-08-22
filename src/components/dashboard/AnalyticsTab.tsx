import { useEffect } from "react";
import { Link } from "react-router-dom";
import useBillingStore from "../../store/useBillingStore";

export default function AnalyticsTab() {
  const { billingState, isLoading, fetchCurrentBilling } = useBillingStore();

  useEffect(() => {
    fetchCurrentBilling();
  }, [fetchCurrentBilling]);

  const hasAnalytics = billingState?.entitlements?.features?.visitorAnalytics === true;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-outfit">
          Visitor Analytics
        </h1>
        <p className="text-sm text-text-secondary">
          Track profile visits, AI conversations, and visitor engagement insights.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-bg-secondary border border-border-primary rounded-3xl">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full mb-3" />
          <p className="text-sm font-medium text-text-secondary">Loading analytics entitlement...</p>
        </div>
      ) : !hasAnalytics ? (
        /* Locked Feature State for Free Users */
        <div className="bg-bg-secondary border border-border-primary rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-bold text-text-primary font-outfit">
              Visitor Analytics is a Pro Feature
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Upgrade to the Pro plan to unlock profile view metrics, visitor query insights, and AI chat performance analytics.
            </p>
          </div>
          <Link
            to="/dashboard/billing"
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-bg-inverse text-text-inverse text-sm font-bold shadow-md hover:bg-black/90 transition-all"
          >
            Upgrade to Pro for ₹499
          </Link>
        </div>
      ) : (
        /* Unlocked Analytics View for Pro Users */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold flex items-center justify-between">
            <span>✨ Pro Entitlement Active: Visitor Analytics Enabled</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold">PRO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 space-y-2 shadow-sm">
              <p className="text-xs font-bold text-text-secondary uppercase">Profile Views</p>
              <p className="text-3xl font-extrabold font-outfit text-text-primary">0</p>
              <p className="text-[11px] text-text-secondary">Tracked in real time</p>
            </div>
            <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 space-y-2 shadow-sm">
              <p className="text-xs font-bold text-text-secondary uppercase">AI Conversations</p>
              <p className="text-3xl font-extrabold font-outfit text-text-primary">0</p>
              <p className="text-[11px] text-text-secondary">Visitor questions answered</p>
            </div>
            <div className="bg-bg-secondary border border-border-primary rounded-3xl p-6 space-y-2 shadow-sm">
              <p className="text-xs font-bold text-text-secondary uppercase">Avg Response Time</p>
              <p className="text-3xl font-extrabold font-outfit text-text-primary">&lt; 1s</p>
              <p className="text-[11px] text-text-secondary">Gemini Pro powered</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
