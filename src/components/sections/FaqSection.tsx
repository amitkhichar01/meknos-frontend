import React from "react";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { AccordionItem } from "../common/AccordionItem";

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      question: "What is Meknos?",
      answer:
        "Meknos is an AI-powered professional profile that lets people learn about you through conversation. Instead of only displaying a traditional portfolio, Meknos allows visitors to ask questions about your experience, skills, projects, and professional background.",
    },
    {
      question: "Who is Meknos for?",
      answer:
        "Meknos is designed for developers, freelancers, creators, consultants, founders, students, and other professionals who want a better way to present themselves online.",
    },
    {
      question: "How does my AI know about me?",
      answer:
        "You provide the information that you want your Meknos profile to know. This can include your experience, skills, projects, education, services, social links, professional background, and other relevant information. Meknos uses that information to generate responses to visitor questions.",
    },
    {
      question: "Does Meknos make up information about me?",
      answer:
        "Meknos is designed to answer based on the information available in your profile rather than inventing details about you. For the best results, keep your profile information complete and up to date.",
    },
    {
      question: "Can I update my profile later?",
      answer:
        "Yes. Your professional profile isn't supposed to become a historical artifact the moment you publish it. You can update your information as your skills, projects, experience, and career change.",
    },
    {
      question: "Can I share my Meknos profile?",
      answer:
        "Yes. Your profile has a shareable URL that you can use on LinkedIn, GitHub, your resume, email signature, social media, portfolio, or anywhere else you want.",
    },
    {
      question: "Do visitors need an account to ask questions?",
      answer:
        "Visitors can interact with your public Meknos profile without needing to create an account.",
    },
    {
      question: "Can I use Meknos instead of my portfolio?",
      answer:
        "Meknos works best alongside your existing online presence. Your portfolio can showcase your work visually, while Meknos gives visitors a conversational way to understand you and find relevant information.",
    },
    {
      question: "Can I use Meknos as a freelancer?",
      answer:
        "Yes. Freelancers can use Meknos to explain their services, experience, projects, skills, and the type of work they are available for. It can also help potential clients understand whether your expertise matches their needs before starting a conversation.",
    },
    {
      question: "Is Meknos only for developers?",
      answer:
        "No. Meknos can be used by anyone who wants to create an interactive professional profile, including designers, marketers, consultants, creators, founders, students, and freelancers.",
    },
    {
      question: "What happens if someone asks something that isn't in my profile?",
      answer:
        "Meknos should avoid presenting unsupported information as fact. If the answer isn't available from your profile information, the AI can indicate that the information isn't available.",
    },
    {
      question: "Can I delete my profile?",
      answer:
        "Yes. You should be able to manage from your account.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-bg-surface/30">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <SectionHeader
            eyebrow="FAQ"
            heading="Frequently asked questions"
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
};
