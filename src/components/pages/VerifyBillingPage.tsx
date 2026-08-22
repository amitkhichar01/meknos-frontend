import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import {
  ReceiptPrinter,
  type ReceiptPrinterStage,
} from "../billing/ReceiptPrinter";
import billingApi, {
  type IPaymentRecord,
  // type ISubscriptionRecord,
} from "../../api/billing.api";
import useAuthStore from "../../store/useAuthStore";
import useBillingStore from "../../store/useBillingStore";
import { siteConfig } from "../../config/site";

export default function VerifyBillingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");

  const { fetchCurrentUser, isAuthenticated, isInitialized } = useAuthStore();
  const { fetchCurrentBilling, fetchPayments, fetchSubscriptions } =
    useBillingStore();

  const [stage, setStage] = useState<ReceiptPrinterStage>("processing");
  const [statusText, setStatusText] = useState<string>(
    "Verifying your payment...",
  );
  const [payment, setPayment] = useState<IPaymentRecord | null>(null);
  // const [subscription, setSubscription] = useState<ISubscriptionRecord | null>(
  //   null,
  // );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const verifyPayment = useCallback(async () => {
    if (!orderId) {
      setStage("error");
      setStatusText("Invalid Order Request");
      setErrorMessage("No order_id query parameter found in URL.");
      setIsVerifying(false);
      return;
    }

    setIsVerifying(true);
    setStage("processing");
    setStatusText("Verifying your payment...");
    setErrorMessage(null);

    try {
      const result = await billingApi.verifyOrder(orderId);
      setPayment(result.payment || null);
      // setSubscription(result.subscription || null);

      if (result.status === "SUCCESS") {
        // Refresh auth & store state in background
        fetchCurrentUser();
        fetchCurrentBilling();
        fetchPayments();
        fetchSubscriptions();

        // 1. Transition to printing stage for feed animation
        setStage("printing");
        setStatusText("Printing your official receipt...");

        // 2. Transition to complete after 1.8s feed animation
        setTimeout(() => {
          setStage("complete");
          setStatusText("Payment Verified & Active!");
        }, 1850);
      } else if (result.status === "PENDING") {
        setStage("pending");
        setStatusText("Payment Verification Pending");
        setErrorMessage(
          "Your payment is currently being processed by Cashfree or your bank. Please re-check in a minute.",
        );
      } else {
        // FAILED | CANCELLED | USER_DROPPED
        setStage("failed");
        setStatusText(`Payment ${result.status || "Failed"}`);
        setErrorMessage(
          result.payment?.paymentMessage ||
            `Your payment was ${result.status?.toLowerCase() || "cancelled or failed"}. No funds were charged.`,
        );
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to verify payment order status with Cashfree.";
      setStage("error");
      setStatusText("Verification Failed");
      setErrorMessage(message);
    } finally {
      setIsVerifying(false);
    }
  }, [
    orderId,
    fetchCurrentUser,
    fetchCurrentBilling,
    fetchPayments,
    fetchSubscriptions,
  ]);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      verifyPayment();
    }
  }, [isInitialized, isAuthenticated, verifyPayment]);

  const handlePrint = () => {
    window.print();
  };

  if (!isInitialized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-bg-primary">
        <div className="animate-spin w-8 h-8 border-4 border-border-primary border-t-text-primary rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const formattedDate = payment?.paidAt
    ? new Date(payment.paidAt).toLocaleString()
    : new Date().toLocaleString();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-bg-primary py-8 sm:py-14 flex flex-col justify-center">
      <Container className="max-w-7xl space-y-8">
        {/* Top Header Card */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary font-outfit tracking-tight">
            {stage === "processing" && "Verifying your payment..."}
            {stage === "printing" && "Processing Receipt..."}
            {stage === "complete" && "Payment Successful! 🎉"}
            {stage === "pending" && "Payment Status Pending"}
            {stage === "failed" && "Payment Failed or Cancelled"}
            {stage === "error" && "Verification Error"}
          </h1>
          <p className="text-sm text-text-secondary max-w-md mx-auto">
            {stage === "processing" &&
              "Please do not close or refresh this page while we verify your order details with Cashfree."}
            {stage === "printing" &&
              "Your transaction was approved! Generating your official digital receipt..."}
            {stage === "complete" &&
              "Your Meknos Pro subscription has been activated successfully. Check your receipt below."}
            {stage === "pending" &&
              "Cashfree is confirming your transaction status. You can check again using the button below."}
            {stage === "failed" &&
              "We could not complete your transaction. You can return to billing to try again."}
            {stage === "error" &&
              "An error occurred while confirming your order status."}
          </p>
        </div>

        {/* Receipt Printer Component */}
        <ReceiptPrinter.Root stage={stage}>
          <ReceiptPrinter.Machine>
            <ReceiptPrinter.Header>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase font-semibold">
                  MEKNOS POS-v2.4
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                CF-PAYMENT-GATEWAY
              </div>
            </ReceiptPrinter.Header>

            <ReceiptPrinter.Screen>
              <div className="space-y-2">
                <ReceiptPrinter.Status>{statusText}</ReceiptPrinter.Status>

                {orderId && (
                  <div className="text-[11px] font-mono text-zinc-400 truncate pt-1 border-t border-zinc-800/80 flex items-center justify-between">
                    <span>ORDER ID:</span>
                    <span className="text-zinc-200 font-bold">{orderId}</span>
                  </div>
                )}
              </div>
            </ReceiptPrinter.Screen>
          </ReceiptPrinter.Machine>

          <ReceiptPrinter.Output>
            <ReceiptPrinter.Paper>
              {/* Receipt Top Header */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed border-neutral-400">
                <div className="font-extrabold text-lg tracking-wider font-outfit uppercase">
                  MEKNOS INC.
                </div>
                <div className="text-[11px] text-neutral-600 font-semibold tracking-widest uppercase">
                  Official Payment Receipt
                </div>
                <div className="text-[10px] text-neutral-500">
                  {siteConfig.url} • {siteConfig.supportEmail}
                </div>
              </div>

              {/* Receipt Metadata */}
              <div className="py-4 text-[12px] space-y-1.5 border-b border-dashed border-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-500">DATE & TIME:</span>
                  <span className="font-bold">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">ORDER ID:</span>
                  <span className="font-bold">{orderId || "N/A"}</span>
                </div>
                {payment?.cfPaymentId && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CF PAYMENT ID:</span>
                    <span className="font-bold">{payment.cfPaymentId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-500">PROVIDER:</span>
                  <span className="font-bold uppercase">
                    {payment?.provider || "CASHFREE PG"}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-4 space-y-2 border-b border-dashed border-neutral-400 text-[12px]">
                <div className="flex justify-between font-bold text-neutral-600 text-[11px] pb-1">
                  <span>ITEM / PLAN</span>
                  <span>AMOUNT</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <div>
                    <div>Meknos Pro Plan</div>
                    <div className="text-[10px] text-neutral-500 font-normal">
                      1 Month Subscription
                    </div>
                  </div>
                  <div>₹{payment?.amount || 499}.00</div>
                </div>
              </div>

              {/* Receipt Totals */}
              <div className="py-4 space-y-1.5 text-[12px] border-b border-dashed border-neutral-400">
                <div className="flex justify-between text-neutral-600">
                  <span>SUBTOTAL:</span>
                  <span>₹{payment?.amount || 499}.00</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>TAX (INCL.):</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between font-bold text-[14px] pt-1 text-black">
                  <span>TOTAL PAID:</span>
                  <span>₹{payment?.amount || 499}.00</span>
                </div>
              </div>

              {/* Status Stamp */}
              <div className="pt-5 pb-2 text-center">
                {stage === "complete" && (
                  <div className="inline-block px-4 py-1.5 rounded border-2 border-emerald-600 text-emerald-700 font-bold text-xs tracking-wider uppercase bg-emerald-50 shadow-xs">
                    ✓ PAYMENT SUCCESSFUL & PRO ACTIVATED
                  </div>
                )}
                {stage === "pending" && (
                  <div className="inline-block px-4 py-1.5 rounded border-2 border-amber-600 text-amber-700 font-bold text-xs tracking-wider uppercase bg-amber-50">
                    ⏳ PAYMENT PENDING CONFIRMATION
                  </div>
                )}
                {(stage === "failed" || stage === "error") && (
                  <div className="inline-block px-4 py-1.5 rounded border-2 border-rose-600 text-rose-700 font-bold text-xs tracking-wider uppercase bg-rose-50">
                    ✕ TRANSACTION UNSUCCESSFUL
                  </div>
                )}
              </div>

              {/* Error Message inside receipt if failed */}
              {errorMessage &&
                (stage === "failed" ||
                  stage === "error" ||
                  stage === "pending") && (
                  <div className="mt-3 p-3 rounded bg-neutral-100 border border-neutral-300 text-[11px] text-neutral-700 leading-relaxed font-sans">
                    <strong>Notice:</strong> {errorMessage}
                  </div>
                )}

              {/* Receipt Footer Barcode decorative */}
              <div className="pt-6 text-center space-y-1">
                <div className="font-mono text-[18px] tracking-[0.25em] text-neutral-400 select-none">
                  ||||| ||| ||||||| || ||||
                </div>
                <div className="text-[9px] text-neutral-500 tracking-widest uppercase">
                  THANK YOU FOR CHOOSING MEKNOS
                </div>
              </div>
            </ReceiptPrinter.Paper>
          </ReceiptPrinter.Output>
        </ReceiptPrinter.Root>

        {/* Action Buttons below printer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {stage === "complete" && (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto min-w-[180px] justify-center"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard/subscriptions")}
                className="w-full sm:w-auto justify-center"
              >
                View Subscriptions
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={handlePrint}
                className="w-full sm:w-auto justify-center"
              >
                🖨️ Print Receipt
              </Button>
            </>
          )}

          {stage === "pending" && (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={verifyPayment}
                disabled={isVerifying}
                className="w-full sm:w-auto justify-center"
              >
                {isVerifying ? "Verifying..." : "Re-check Status"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard/billing")}
                className="w-full sm:w-auto justify-center"
              >
                Back to Billing
              </Button>
            </>
          )}

          {(stage === "failed" || stage === "error") && (
            <>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/dashboard/billing")}
                className="w-full sm:w-auto justify-center"
              >
                Try Upgrade Again
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto justify-center"
              >
                Go to Dashboard
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
