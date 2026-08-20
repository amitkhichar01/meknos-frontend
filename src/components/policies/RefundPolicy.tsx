import { PolicyLayout } from "./PolicyLayout";

interface RefundPolicyProps {
  onBack?: () => void;
}

export default function RefundPolicy({ onBack }: RefundPolicyProps) {
  return (
    <PolicyLayout
      title="Refund & Cancellation Policy"
      lastUpdated="August 18, 2026"
      onBack={onBack}
    >
      {/* Intro */}
      <div className="space-y-4">
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          This Refund and Cancellation Policy explains how subscription
          cancellations and refunds work for Meknos paid plans.
        </p>
      </div>

      {/* 1. Subscription Cancellation */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          1. Subscription Cancellation
        </h2>

        <p className="text-text-secondary">
          Once a Meknos subscription plan has been purchased, the subscription
          cannot be cancelled during the active billing period.
        </p>

        <p className="text-text-secondary">
          Meknos does not provide refunds, credits, or partial refunds for
          subscriptions after a payment has been successfully completed.
        </p>

        <p className="text-text-secondary font-semibold">
          By purchasing a paid Meknos plan, you acknowledge and agree that the
          purchase is final and that you will not be able to cancel the plan or
          request a refund for the remaining subscription period.
        </p>
      </section>

      {/* 2. Refunds */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          2. Refunds
        </h2>

        <p className="text-text-secondary">
          All payments for Meknos paid plans are final and non-refundable.
          Meknos does not provide refunds, credits, or partial refunds once a
          payment has been successfully completed.
        </p>

        <p className="text-text-secondary">
          We encourage users to review the plan details, pricing, included
          features, and usage limits carefully before completing a purchase.
        </p>

        <p className="text-text-secondary">
          In cases of duplicate charges or an incorrect payment caused by a
          technical issue, Meknos may review the transaction and take
          appropriate corrective action.
        </p>
      </section>

      {/* 3. Duplicate or Incorrect Charges */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          3. Duplicate or Incorrect Charges
        </h2>
        <p className="text-text-secondary">
          If you believe you have been charged more than once for the same
          subscription or have received an incorrect charge, contact our support
          team.
        </p>
        <p className="text-text-secondary text-sm">
          We will review the transaction and, where appropriate, issue a refund
          for verified duplicate or incorrect charges.
        </p>
      </section>

      {/* 4. Failed Payments */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          4. Failed Payments
        </h2>
        <p className="text-text-secondary">
          If a recurring subscription payment fails, Meknos or its payment
          provider may attempt to process the payment again.
        </p>
        <p className="text-text-secondary text-sm">
          If payment remains unsuccessfol, access to paid features may be
          restricted or the subscription may be cancelled.
        </p>
      </section>

      {/* 5. Promotional Offers */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          5. Promotional Offers
        </h2>
        <p className="text-text-secondary">
          Special promotional offers may have different pricing, duration,
          eligibility conditions.
        </p>
        <p className="text-text-secondary text-sm">
          Where applicable, the terms of the promotion will be displayed before
          purchase.
        </p>
      </section>     

      {/* 6. Policy Changes */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          6. Policy Changes
        </h2>
        <p className="text-text-secondary">
          Meknos may update this policy when necessary.
        </p>
        <p className="text-text-secondary text-sm">
          Any updated version will be published on this page with a revised
          &quot;Last Updated&quot; date.
        </p>
      </section>
    </PolicyLayout>
  );
}
