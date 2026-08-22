import api from "./axios";

export interface ICreateOrderPayload {
  planCode: string;
}

export interface ICreateOrderResponse {
  orderId: string;
  paymentSessionId: string;
  amount: number;
  currency: string;
  planName: string;
}

export interface IEntitlements {
  features: {
    profileCreate: boolean;
    shareableProfile: boolean;
    removeBranding: boolean;
    aiTone: boolean;
    visitorAnalytics: boolean;
    higherLlmModel: boolean;
  };
  limits: {
    aiMessagesPerMonth: number | null;
  };
}

export interface IBillingState {
  plan: {
    code: string;
    name: string;
    description?: string;
    version?: number;
  };
  status: "FREE" | "ACTIVE" | "EXPIRED";
  price?: number;
  currency?: string;
  startedAt?: string;
  expiresAt?: string;
  entitlements: IEntitlements;
}

export interface IPaymentRecord {
  _id: string;
  userId: string;
  planId: {
    _id: string;
    name: string;
    code: string;
    version?: number;
  };
  planCode: string;
  planVersion: number;
  orderId: string;
  cfPaymentId?: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "USER_DROPPED" | "CANCELLED";
  paymentMethod?: string;
  paymentGroup?: string;
  paymentMessage?: string;
  paidAt?: string;
  createdAt: string;
}

export interface ISubscriptionRecord {
  _id: string;
  userId: string;
  planId: {
    _id: string;
    name: string;
    code: string;
    version?: number;
  };
  planCode: string;
  planVersion: number;
  price: number;
  currency: string;
  duration: string;
  entitlements: IEntitlements;
  paymentId: string;
  startedAt: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  createdAt: string;
}

export interface IVerifyOrderResponse {
  status: "SUCCESS" | "PENDING" | "FAILED" | "USER_DROPPED" | "CANCELLED";
  orderStatus?: string;
  payment?: IPaymentRecord;
  subscription?: ISubscriptionRecord;
}

export const billingApi = {
  createOrder: async (payload: ICreateOrderPayload): Promise<ICreateOrderResponse> => {
    const response = await api.post("/billing/create-order", payload);
    return response.data.data;
  },

  verifyOrder: async (orderId: string): Promise<IVerifyOrderResponse> => {
    const response = await api.get(`/billing/verify-order/${orderId}`);
    return response.data.data;
  },

  getCurrentBilling: async (): Promise<IBillingState> => {
    const response = await api.get("/billing/current");
    return response.data.data;
  },

  getPayments: async (): Promise<IPaymentRecord[]> => {
    const response = await api.get("/billing/payments");
    return response.data.data;
  },

  getSubscriptions: async (): Promise<ISubscriptionRecord[]> => {
    const response = await api.get("/billing/subscriptions");
    return response.data.data;
  },
};

export default billingApi;
