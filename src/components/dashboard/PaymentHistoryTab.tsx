import { useEffect } from "react";
import useBillingStore from "../../store/useBillingStore";

export default function PaymentHistoryTab() {
  const { payments, isLoading, error, fetchPayments, clearError } = useBillingStore();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

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
          Payment History
        </h1>
        <p className="text-sm text-text-secondary">
          View all your previous payment transactions.
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center bg-bg-secondary border border-border-primary rounded-3xl">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full mb-3" />
          <p className="text-sm font-medium text-text-secondary">Loading payment transactions...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="p-10 text-center bg-bg-secondary border border-border-primary rounded-3xl space-y-2">
          <p className="text-base font-bold text-text-primary font-outfit">No Payments Found</p>
          <p className="text-xs text-text-secondary">
            You haven't made any payment transactions yet.
          </p>
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border-primary rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/5 text-text-secondary text-xs uppercase font-extrabold tracking-wider border-b border-border-primary">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-text-primary">
                      {p.orderId}
                    </td>
                    <td className="px-6 py-4 font-bold text-text-primary">
                      {p.planId?.name || p.planCode}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-text-primary font-outfit">
                      {p.currency} ₹{p.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          p.status === "SUCCESS"
                            ? "bg-emerald-500/15 text-emerald-700"
                            : p.status === "PENDING"
                            ? "bg-amber-500/15 text-amber-700"
                            : "bg-red-500/15 text-red-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-secondary">
                      {new Date(p.createdAt).toLocaleDateString()} {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
