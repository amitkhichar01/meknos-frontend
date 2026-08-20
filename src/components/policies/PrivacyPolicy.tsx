import { PolicyLayout } from "./PolicyLayout";
import { siteConfig } from "../../config/site";

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="August 18, 2026"
      onBack={onBack}
    >
      {/* Intro */}
      <div className="space-y-4">
        <p>
          Meknos (&quot;Meknos&quot;, &quot;we&quot;, &quot;our&quot;, or
          &quot;us&quot;) provides an AI-powered personal profile platform that
          allows users to create a public profile, share professional
          information, and provide an AI-powered chat experience through a
          unique profile URL.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, and protect
          information when you use the Meknos website and services.
        </p>
        <p className="font-semibold text-text-primary">
          By using Meknos, you agree to the practices described in this Privacy
          Policy.
        </p>
      </div>

      {/* 1. Information We Collect */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          1. Information We Collect
        </h2>

        <div className="space-y-3 pl-2 sm:pl-4">
          <h3 className="text-lg font-semibold text-text-primary">
            1.1 Account Information
          </h3>
          <p className="text-text-secondary">
            When you create an account, we may collect information such as:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-text-secondary pl-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Profile information</li>
            <li>Login and authentication information</li>
            <li>Profile username or public profile URL</li>
          </ol>
          <p className="text-text-secondary text-sm pt-1">
            If you sign in using a third-party authentication provider, such as
            Google, we may receive information provided by that provider that is
            necessary to create and authenticate your account.
          </p>
        </div>

        <div className="space-y-3 pl-2 sm:pl-4 pt-2">
          <h3 className="text-lg font-semibold text-text-primary">
            1.2 Profile Information
          </h3>
          <p className="text-text-secondary">
            Meknos allows users to create a personal profile containing
            information they choose to provide. This may include:
          </p>
          <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
            <li>Name and professional title</li>
            <li>Biography or introduction</li>
            <li>Skills</li>
            <li>Work experience</li>
            <li>Projects</li>
            <li>Portfolio information</li>
            <li>Social media and professional links</li>
            <li>Contact or business information</li>
            <li>Other information voluntarily added to the profile</li>
          </ol>
          <p className="text-text-secondary text-sm pt-1">
            Users are responsible for ensuring that information they publish
            through their public Meknos profile is appropriate and does not
            violate the rights of others.
          </p>
        </div>

        <div className="space-y-3 pl-2 sm:pl-4 pt-2">
          <h3 className="text-lg font-semibold text-text-primary">
            1.3 Chat and AI Interaction Data
          </h3>
          <p className="text-text-secondary">
            When visitors interact with an AI-powered Meknos profile, we may
            collect:
          </p>
          <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
            <li>Questions submitted by visitors</li>
            <li>AI-generated responses</li>
            <li>Chat session information</li>
            <li>Visitor identifiers</li>
            <li>Basic technical information associated with the interaction</li>
          </ol>
          <p className="text-text-secondary text-sm pt-1">
            This information helps us provide the chat service, maintain
            conversations, prevent abuse, and improve the reliability of the
            platform.
          </p>
        </div>

        <div className="space-y-3 pl-2 sm:pl-4 pt-2">
          <h3 className="text-lg font-semibold text-text-primary">
            1.4 Usage and Analytics Information
          </h3>
          <p className="text-text-secondary">
            We may collect limited technical and usage information, including:
          </p>
          <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Profile views</li>
            <li>Chat interactions</li>
            <li>Referring pages</li>
            <li>Date and time of interactions</li>
          </ol>
          <p className="text-text-secondary text-sm pt-1">
            We use this information primarily for security, analytics,
            troubleshooting, and improving Meknos.
          </p>
        </div>

        <div className="space-y-3 pl-2 sm:pl-4 pt-2">
          <h3 className="text-lg font-semibold text-text-primary">
            1.5 Payment Information
          </h3>
          <p className="text-text-secondary">
            If you purchase a paid Meknos plan, payment processing may be
            handled by third-party payment providers.
          </p>
          <p className="text-text-secondary">
            Meknos does not intentionally store complete payment card numbers,
            CVV numbers, or other sensitive payment credentials on its own
            servers.
          </p>
          <p className="text-text-secondary text-sm">
            Payment providers may collect and process payment information
            according to their own privacy policies and security practices.
          </p>
        </div>
      </section>

      {/* 2. How We Use Your Information */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          2. How We Use Your Information
        </h2>
        <p className="text-text-secondary">
          We may use collected information to:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Create and manage your Meknos account</li>
          <li>Provide and maintain the Meknos platform</li>
          <li>Create and display your public profile</li>
          <li>
            Generate AI-powered responses based on information you provide
          </li>
          <li>Maintain chat sessions</li>
          <li>Provide analytics and usage information</li>
          <li>Process subscriptions and payments</li>
          <li>Prevent fraud, abuse, and unauthorized access</li>
          <li>Monitor platform security</li>
          <li>Troubleshoot technical problems</li>
          <li>Improve our products and services</li>
          <li>Communicate with you about your account or service</li>
          <li>Comply with applicable legal obligations</li>
        </ol>
        <p className="font-semibold text-text-primary pt-2">
          We do not sell your personal information as a product to third
          parties.
        </p>
      </section>

      {/* 3. AI Processing */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          3. AI Processing
        </h2>
        <p className="text-text-secondary">
          Meknos uses artificial intelligence to generate responses to questions
          asked about a user&apos;s profile.
        </p>
        <p className="text-text-secondary">
          The AI may process information that the profile owner has provided to
          Meknos for the purpose of generating relevant responses.
        </p>
        <p className="text-text-secondary">
          AI-generated responses may not always be completely accurate. Users
          shoold review the information they provide and shoold not rely on
          AI-generated responses as a substitute for professional advice.
        </p>
        <p className="text-text-secondary">
          Meknos does not intentionally instruct the AI to disclose private
          information that has not been provided for the public profile
          experience.
        </p>
      </section>

      {/* 4. Public Profiles */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          4. Public Profiles
        </h2>
        <p className="text-text-secondary">
          Meknos profiles are designed to be publicly accessible through a
          unique URL.
        </p>
        <p className="text-text-secondary">
          Information that a user intentionally publishes on their public
          profile may be visible to anyone who has access to the profile URL.
        </p>
        <p className="text-text-secondary font-semibold">
          Users shoold not publish sensitive personal information, passwords,
          financial information, government identification numbers, or other
          confidential information on their public profile.
        </p>
      </section>

      {/* 5. Cookies and Similar Technologies */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          5. Cookies and Similar Technologies
        </h2>
        <p className="text-text-secondary">
          Meknos may use cookies and similar technologies to:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Maintain authentication sessions</li>
          <li>Remember preferences</li>
          <li>Improve website functionality</li>
          <li>Understand website usage</li>
          <li>Monitor security and performance</li>
        </ol>
        <p className="text-text-secondary text-sm">
          You may control cookies through your browser settings. Disabling
          certain cookies may affect some functionality of the platform.
        </p>
      </section>

      {/* 6. Third-Party Services */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          6. Third-Party Services
        </h2>
        <p className="text-text-secondary">
          Meknos may use third-party service providers for functions such as:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Authentication</li>
          <li>Cloud hosting</li>
          <li>Database services</li>
          <li>AI processing</li>
          <li>Payment processing</li>
          <li>Analytics</li>
          <li>Security</li>
          <li>Email or communication services</li>
        </ol>
        <p className="text-text-secondary text-sm">
          These providers may process information on our behalf and are expected
          to handle information according to applicable security and privacy
          requirements.
        </p>
      </section>

      {/* 7. Data Security */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          7. Data Security
        </h2>
        <p className="text-text-secondary">
          We take reasonable technical and organizational measures to protect
          information against unauthorized access, alteration, disclosure, or
          destruction.
        </p>
        <p className="text-text-secondary">
          However, no internet-based service can guarantee absolute security.
          Users understand that transmission of information over the internet
          always carries some level of risk.
        </p>
      </section>

      {/* 8. Data Retention */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          8. Data Retention
        </h2>
        <p className="text-text-secondary">
          We retain information for as long as reasonably necessary to:
        </p>
        <ol className="list-disc list-inside space-y-1 text-text-secondary pl-2">
          <li>Provide the services</li>
          <li>Maintain your account</li>
          <li>Meet legitimate business requirements</li>
          <li>Resolve disputes</li>
          <li>Prevent fraud and abuse</li>
          <li>Comply with legal obligations</li>
        </ol>
        <p className="text-text-secondary text-sm">
          When information is no longer required, we may delete or anonymize it
          in accordance with our data retention practices.
        </p>
      </section>

      {/* 9. Account and Data Deletion */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          9. Account and Data Deletion
        </h2>
        <p className="text-text-secondary">
          You may request deletion of your Meknos account and associated
          personal information by contacting us.
        </p>
        <p className="text-text-secondary text-sm">
          Certain information may need to be retained where required by law, for
          legitimate security purposes, or to resolve disputes and enforce
          agreements.
        </p>
      </section>

      {/* 10. Children's Privacy */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          10. Children&apos;s Privacy
        </h2>
        <p className="text-text-secondary">
          Meknos is intended for users who are legally able to use online
          services in their jurisdiction.
        </p>
        <p className="text-text-secondary">
          We do not knowingly collect personal information from children where
          such collection is prohibited by applicable law.
        </p>
        <p className="text-text-secondary text-sm">
          If you believe a child has provided personal information to us, please
          contact us so that we can review and take appropriate action.
        </p>
      </section>

      {/* 11. International Data Processing */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          11. International Data Processing
        </h2>
        <p className="text-text-secondary">
          Depending on the infrastructure and service providers used by Meknos,
          your information may be processed or stored in countries other than
          your country of residence.
        </p>
        <p className="text-text-secondary text-sm">
          Where required, we take reasonable steps to ensure that such
          processing is conducted in accordance with applicable laws.
        </p>
      </section>

      {/* 12. Changes to This Privacy Policy */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          12. Changes to This Privacy Policy
        </h2>
        <p className="text-text-secondary">
          We may update this Privacy Policy from time to time.
        </p>
        <p className="text-text-secondary">
          When changes are made, we will update the &quot;Last Updated&quot;
          date at the top of this page.
        </p>
        <p className="text-text-secondary text-sm">
          Your continued use of Meknos after an updated Privacy Policy becomes
          effective means you acknowledge the updated policy.
        </p>
      </section>

      {/* 13. Contact Us */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
          13. Contact Us
        </h2>
        <p className="text-text-secondary">
          If you have questions, concerns, or requests regarding this Privacy
          Policy or your personal information, contact us through the contact
          information provided on the Meknos website.
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
