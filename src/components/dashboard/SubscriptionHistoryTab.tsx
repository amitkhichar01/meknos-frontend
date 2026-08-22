import { useEffect } from "react";
import useBillingStore from "../../store/useBillingStore";

export default function SubscriptionHistoryTab() {
  const { subscriptions, isLoading, error, fetchSubscriptions, clearError } = useBillingStore();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
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

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-outfit">
          Subscription History
        </h1>
        <p className="text-sm text-text-secondary">
          View your paid access periods and entitlement snapshots.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-bg-secondary border border-border-primary rounded-3xl">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full mb-3" />
          <p className="text-sm font-medium text-text-secondary">Loading subscription history...</p>
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="p-10 text-center bg-bg-secondary border border-border-primary rounded-3xl space-y-2">
          <p className="text-base font-bold text-text-primary font-outfit">No Subscriptions Found</p>
          <p className="text-xs text-text-secondary">
            You don't have any past or active paid subscription access periods.
          </p>
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-text-secondary text-xs uppercase font-extrabold tracking-wider border-b border-border-primary">
                <tr>
                  <th className="px-6 py-4">Plan Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Access Period</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                {subscriptions.map((sub) => {
                  const isExpired = new Date(sub.expiresAt).getTime() < Date.now();
                  const statusLabel = isExpired ? "EXPIRED" : sub.status;

                  return (
                    <tr key={sub._id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-text-primary">
                        {sub.planId?.name || sub.planCode}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-text-primary font-outfit">
                        {sub.currency} ₹{sub.price}
                      </td>
                      <td className="px-6 py-4 text-xs text-text-secondary">
                        {new Date(sub.startedAt).toLocaleDateString()} →{" "}
                        {new Date(sub.expiresAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                            statusLabel === "ACTIVE"
                              ? "bg-emerald-500/15 text-emerald-700"
                              : "bg-black/10 text-text-secondary"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono font-semibold text-text-secondary">
                        v{sub.planVersion}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
