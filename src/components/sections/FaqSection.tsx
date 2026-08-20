import Container from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { AccordionItem } from "../common/AccordionItem";

export default function FaqSection() {
  const faqs = [
    {
      question: "What is Meknos?",
      answer:
        "Meknos is an interactive profile that helps people understand you through conversation. Instead of making visitors search through your portfolio, resume, and links, they can ask questions and get answers based on the information you choose to share.",
    },

    {
      question: "What can people ask my Meknos profile?",
      answer:
        "Visitors can ask questions about anything you've included in your profile, such as your experience, projects, skills, services, education, work history, interests, or professional background. They can ask naturally instead of looking for specific sections or keywords.",
    },

    {
      question: "Who is Meknos for?",
      answer:
        "Meknos is for anyone who wants a better way to present themselves online. You can use it to showcase your work, explain what you do, share your experience, or help people quickly understand whether you're the right person for an opportunity.",
    },

    {
      question: "How does Meknos know about me?",
      answer:
        "You provide the information you want your profile to know. This can include your experience, projects, skills, education, services, links, and other information about you. Meknos uses that information to answer questions from visitors.",
    },

    {
      question: "Can Meknos make up information about me?",
      answer:
        "Meknos is designed to answer using the information available in your profile and avoid presenting unsupported details as facts. If your profile doesn't contain enough information to answer a question, it should indicate that the information isn't available rather than inventing an answer.",
    },

    {
      question: "Can I control what information my profile shares?",
      answer:
        "Yes. Your Meknos profile is built from the information you choose to provide. You can decide what you want to include and keep your profile updated as your work, experience, and goals change.",
    },

    {
      question: "Do visitors need a Meknos account to talk to my profile?",
      answer:
        "No. Your profile is public and visitors can ask questions without creating a Meknos account.",
    },

    {
      question: "Can I share my Meknos profile anywhere?",
      answer:
        "Yes. Your Meknos profile has a shareable URL that you can use on LinkedIn, GitHub, your resume, email signature, social media, personal websites, or anywhere else you share your professional presence.",
    },

    {
      question: "Can I update my profile after publishing it?",
      answer:
        "Yes. You can update your profile whenever your work, projects, experience, skills, or other information changes. Your profile should grow with you rather than becoming outdated after you publish it.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="FAQ"
            heading="Your questions, answered"
          />

          {/* Accordion list */}
          <div className="max-w-3xl mx-auto space-y-4 pt-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export { FaqSection };
