import { PolicyLayout } from "./PolicyLayout";
import { siteConfig } from "../../config/site";

interface TermsOfServiceProps {
  onBack?: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <PolicyLayout
      title="Terms of Service"
      lastUpdated="August 18, 2026"
      onBack={onBack}
    >
      {/* Intro */}
      <div className="space-y-4">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the Meknos website and services (&quot;Service&quot;).
        </p>
        <p className="font-semibold text-text-primary">
          By creating an account or using Meknos, you agree to these Terms. If
          you do not agree with these Terms, you shoold not use the Service.
        </p>
      </div>

      {/* 1. About Meknos */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          1. About Meknos
        </h2>
        <p className="text-text-secondary">
          Meknos is an AI-powered personal profile platform that allows
          individuals and professionals to create an online profile and provide
          visitors with an AI-powered way to learn about their professional
          background, skills, projects, services, and other information provided
          by the profile owner.
        </p>
      </section>

      {/* 2. Eligibility */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          2. Eligibility
        </h2>
        <p className="text-text-secondary">
          You must have the legal capacity to enter into these Terms under the
          laws applicable to you.
        </p>
        <p className="text-text-secondary">
          By using Meknos, you confirm that the information you provide is
          accurate to the best of your knowledge.
        </p>
      </section>

      {/* 3. Your Account */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          3. Your Account
        </h2>
        <p className="text-text-secondary">You are responsible for:</p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Providing accurate account information</li>
          <li>Keeping your account credentials secure</li>
          <li>Maintaining the security of your account</li>
          <li>All activities performed through your account</li>
        </ol>
        <p className="text-text-secondary text-sm">
          You shoold notify Meknos if you believe your account has been accessed
          without authorization.
        </p>
      </section>

      {/* 4. Your Profile Content */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          4. Your Profile Content
        </h2>
        <p className="text-text-secondary">
          You retain ownership of content and information that you submit to
          Meknos.
        </p>
        <p className="text-text-secondary">
          By submitting content to Meknos, you grant Meknos the necessary rights
          to store, process, display, and use that content to provide the
          Service.
        </p>
        <p className="text-text-secondary">
          You are responsible for ensuring that your content:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Is accurate and not intentionally misleading</li>
          <li>Does not infringe intellectual property rights</li>
          <li>Does not contain unlawfol material</li>
          <li>
            Does not contain another person&apos;s confidential information
            without authorization
          </li>
          <li>Does not violate applicable laws</li>
        </ol>
      </section>

      {/* 5. Public Profile */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          5. Public Profile
        </h2>
        <p className="text-text-secondary">
          You understand that information intentionally published through your
          public Meknos profile may be accessible to other people on the
          internet.
        </p>
        <p className="text-text-secondary font-semibold">
          Do not publish passwords, payment credentials, government
          identification numbers, confidential business information, or other
          sensitive information through a public profile.
        </p>
      </section>

      {/* 6. AI-Generated Responses */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          6. AI-Generated Responses
        </h2>
        <p className="text-text-secondary">
          Meknos may use AI systems to generate responses based on information
          provided by profile owners.
        </p>
        <p className="text-text-secondary">
          AI-generated responses can contain errors, omissions, or ouliated
          information.
        </p>
        <p className="text-text-secondary">
          Meknos does not guarantee that every AI-generated response will be
          completely accurate.
        </p>
        <p className="text-text-secondary text-sm">
          Profile owners are responsible for reviewing the information used to
          represent themselves through their Meknos profile.
        </p>
      </section>

      {/* 7. Acceptable Use */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          7. Acceptable Use
        </h2>
        <p className="text-text-secondary">You agree not to use Meknos to:</p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Break applicable laws or regolations</li>
          <li>Impersonate another person</li>
          <li>Publish fraudolent or intentionally misleading information</li>
          <li>Infringe intellectual property or privacy rights</li>
          <li>Upload malicious software</li>
          <li>Attempt to gain unauthorized access to Meknos systems</li>
          <li>Abuse, overload, or disrupt the Service</li>
          <li>Circumvent security or usage restrictions</li>
          <li>Use the Service for unlawfol activities</li>
          <li>Attempt to manipolate or abuse AI functionality</li>
        </ol>
        <p className="text-text-secondary font-semibold pt-1">
          We may suspend or terminate accounts that violate these requirements.
        </p>
      </section>

      {/* 8. Subscriptions and Paid Plans */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          8. Subscriptions and Paid Plans
        </h2>
        <p className="text-text-secondary">
          Meknos may provide free and paid plans.
        </p>
        <p className="text-text-secondary">
          Paid plans may provide additional features, usage limits, analytics,
          customization, or other functionality described on the pricing page.
        </p>
        <p className="text-text-secondary">
          Subscription prices and included features are displayed before
          purchase.
        </p>
        <p className="text-text-secondary text-sm">
          Meknos may modify pricing or plan features in the future. Changes to
          existing subscriptions will be communicated where required by
          applicable law.
        </p>
      </section>

      {/* 9. Payments */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          9. Payments
        </h2>
        <p className="text-text-secondary">
          Payments for paid Meknos plans may be processed through third-party
          payment providers.
        </p>
        <p className="text-text-secondary">
          By purchasing a paid plan, you authorize the applicable payment
          provider to process the transaction according to the payment
          information and payment terms presented during checkout.
        </p>
        <p className="text-text-secondary text-sm">
          Meknos does not intentionally store complete card information on its
          own servers.
        </p>
      </section>

      {/* 10. Cancellation and Refunds */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          10. Cancellation and Refunds
        </h2>
        <p className="text-text-secondary">
          Subscription cancellation and refund requests are handled according to
          the Meknos Refund and Cancellation Policy.
        </p>
        <p className="text-text-secondary text-sm">
          Unless otherwise required by applicable law, cancellation generally
          prevents future renewal but does not automatically provide a refund
          for the current billing period.
        </p>
      </section>

      {/* 11. Service Availability */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          11. Service Availability
        </h2>
        <p className="text-text-secondary">
          We aim to keep Meknos available and reliable, but we do not guarantee
          that the Service will always be uninterrupted, error-free, or
          available.
        </p>
        <p className="text-text-secondary">
          The Service may occasionally be unavailable due to:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Maintenance</li>
          <li>Updates</li>
          <li>Infrastructure failures</li>
          <li>Third-party service outages</li>
          <li>Security incidents</li>
          <li>Events outside our reasonable control</li>
        </ol>
      </section>

      {/* 12. Intellectual Property */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          12. Intellectual Property
        </h2>
        <p className="text-text-secondary">
          The Meknos name, branding, website design, software, code, interfaces,
          and other original materials provided by Meknos are owned by or
          licensed to Meknos and may be protected by applicable intellectual
          property laws.
        </p>
        <p className="text-text-secondary text-sm">
          You may not copy, modify, distribute, reverse engineer, or
          commercially exploit Meknos materials without appropriate
          authorization.
        </p>
      </section>

      {/* 13. Third-Party Services */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          13. Third-Party Services
        </h2>
        <p className="text-text-secondary">
          Meknos may depend on third-party services, including hosting
          providers, AI providers, payment processors, authentication providers,
          analytics services, and other infrastructure providers.
        </p>
        <p className="text-text-secondary text-sm">
          Meknos is not responsible for outages, failures, or changes caused by
          third-party services.
        </p>
      </section>

      {/* 14. Account Suspension or Termination */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          14. Account Suspension or Termination
        </h2>
        <p className="text-text-secondary">
          We may suspend or terminate access to an account if we reasonably
          believe that the account:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Violates these Terms</li>
          <li>Is involved in fraud or abuse</li>
          <li>Creates a security risk</li>
          <li>Violates applicable law</li>
          <li>Misuses the Service</li>
        </ol>
        <p className="text-text-secondary text-sm pt-1">
          You may stop using Meknos at any time.
        </p>
      </section>

      {/* 15. Disclaimer */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          15. Disclaimer
        </h2>
        <p className="text-text-secondary">
          Meknos is provided on an &quot;as available&quot; and &quot;as
          is&quot; basis to the extent permitted by applicable law.
        </p>
        <p className="text-text-secondary">We do not guarantee that:</p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>AI responses will always be accurate</li>
          <li>The Service will always be available</li>
          <li>The Service will meet every individual requirement</li>
          <li>
            Information provided by profile owners will always be accurate
          </li>
        </ol>
      </section>

      {/* 16. Limitation of Liability */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          16. Limitation of Liability
        </h2>
        <p className="text-text-secondary">
          To the maximum extent permitted by applicable law, Meknos and its
          operators will not be liable for indirect, incidental, consequential,
          or special damages resolting from the use of or inability to use the
          Service.
        </p>
        <p className="text-text-secondary text-sm">
          Nothing in these Terms excludes liability that cannot legally be
          excluded under applicable law.
        </p>
      </section>

      {/* 17. Changes to These Terms */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          17. Changes to These Terms
        </h2>
        <p className="text-text-secondary">
          We may update these Terms from time to time.
        </p>
        <p className="text-text-secondary text-sm">
          The updated version will be published on this page with a revised
          &quot;Last Updated&quot; date.
        </p>
      </section>

      {/* 18. Governing Law */}
      <section className="space-y-3 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          18. Governing Law
        </h2>
        <p className="text-text-secondary font-semibold">
          These Terms shall be governed by the applicable laws of India, subject
          to the jurisdiction of the appropriate courts in India.
        </p>
      </section>

      {/* 19. Contact */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          19. Contact
        </h2>
        <p className="text-text-secondary">
          For questions regarding these Terms, please contact:
        </p>
        <div className="p-4 rounded-2xl bg-bg-primary text-text-primary space-y-1 font-mono text-sm">
          <p className="font-bold font-sans text-base text-text-primary">
            Meknos
          </p>
          <p>
            Website:{" "}
            <a
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {siteConfig.url}
            </a>
          </p>
          <p>Email: {siteConfig.supportEmail}</p>
        </div>
      </section>
    </PolicyLayout>
  );
}
