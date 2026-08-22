import { create } from "zustand";
import billingApi, {
  type IBillingState,
  type IPaymentRecord,
  type ISubscriptionRecord,
} from "../api/billing.api";
import { getCashfreeInstance } from "../utils/cashfreeSdk";

interface BillingStoreState {
  billingState: IBillingState | null;
  payments: IPaymentRecord[];
  subscriptions: ISubscriptionRecord[];
  isLoading: boolean;
  isProcessingCheckout: boolean;
  error: string | null;

  fetchCurrentBilling: () => Promise<void>;
  fetchPayments: () => Promise<void>;
  fetchSubscriptions: () => Promise<void>;
  initiateProCheckout: () => Promise<{ success: boolean; orderId?: string; error?: string }>;
  verifyOrder: (orderId: string) => Promise<boolean>;
  clearError: () => void;
}

export const useBillingStore = create<BillingStoreState>((set, get) => ({
  billingState: null,
  payments: [],
  subscriptions: [],
  isLoading: false,
  isProcessingCheckout: false,
  error: null,

  fetchCurrentBilling: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await billingApi.getCurrentBilling();
      set({ billingState: data, isLoading: false });
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to load billing state.";
      set({ error: message, isLoading: false });
    }
  },

  fetchPayments: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await billingApi.getPayments();
      set({ payments: data, isLoading: false });
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to load payment history.";
      set({ error: message, isLoading: false });
    }
  },

  fetchSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await billingApi.getSubscriptions();
      set({ subscriptions: data, isLoading: false });
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to load subscription history.";
      set({ error: message, isLoading: false });
    }
  },

  initiateProCheckout: async () => {
    set({ isProcessingCheckout: true, error: null });
    try {
      // 1. Call backend API to create order using server-side price
      const orderData = await billingApi.createOrder({ planCode: "pro_monthly" });

      // 2. Initialize Cashfree PG Web SDK
      const cashfree = await getCashfreeInstance("sandbox");

      // 3. Trigger Cashfree checkout popup / redirect
      await cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_self",
      });

      set({ isProcessingCheckout: false });
      return { success: true, orderId: orderData.orderId };
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to initiate payment checkout.";
      set({ error: message, isProcessingCheckout: false });
      return { success: false, error: message };
    }
  },

  verifyOrder: async (orderId: string) => {
    set({ isLoading: true, error: null });
    try {
      await billingApi.verifyOrder(orderId);
      await get().fetchCurrentBilling();
      await get().fetchPayments();
      await get().fetchSubscriptions();
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || "Payment verification failed.";
      set({ error: message, isLoading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useBillingStore;
