'use client';

import { cn } from "@/lib/utils";
import { FC, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isActive: boolean;
  onClick: () => void;
}

const FAQItem: FC<FAQItemProps> = ({
  question,
  answer,
  isActive,
  onClick
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div 
      className={cn(
        "border-b border-zinc-800/50 transition-all duration-300",
        isActive ? "border-[var(--theme-yellow)]/50" : ""
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <h4 className={cn(
          "text-lg font-medium transition-colors duration-300",
          isActive ? "text-[var(--theme-yellow)]" : "text-white"
        )}>
          {question}
        </h4>
        <ChevronDown 
          size={20} 
          className={cn(
            "transition-transform duration-300",
            isActive ? "rotate-180 text-[var(--theme-yellow)]" : "text-zinc-400"
          )}
        />
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          height: isActive ? contentHeight : 0,
          opacity: isActive ? 1 : 0
        }}
      >
        <div ref={contentRef} className="pb-6">
          <p className="text-zinc-400 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

interface FAQProps {
  className?: string;
}

const FAQ: FC<FAQProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Met.AI?",
      answer: "Met.AI is a decentralized AI agent marketplace that enables users to access, customize, and interact with AI agents through an open, trustless platform."
    },
    {
      question: "How do users interact with AI agents on Met.AI?",
      answer: "Users can publish tasks, receive agent recommendations, initiate bidding, or subscribe to long-term services—all handled via smart contracts."
    },
    {
      question: "Who can participate in the Met.AI ecosystem?",
      answer: "Individuals, businesses, and developers can all participate—as task issuers, agent providers, or builders of custom AI solutions."
    },
    {
      question: "What makes Met.AI different from traditional AI platforms?",
      answer: "Met.AI is fully decentralized, permissionless, and transparent, with an open marketplace model, on-chain reputation, and programmable service interactions."
    },
    {
      question: "How does the platform ensure security and data privacy?",
      answer: "Met.AI integrates Trusted Execution Environments (TEE) and DID identity layers to secure task execution and user data."
    },
    {
      question: "Can developers monetize their AI agents?",
      answer: "Yes. Developers can earn $MET by publishing agents, completing tasks, or offering subscription services. Reputation affects discoverability and pricing."
    },
    {
      question: "What is the role of the $MET token?",
      answer: "$MET is the utility and governance token used for accessing services, paying fees, staking, earning rewards, and participating in protocol decisions."
    },
    {
      question: "Which blockchains and systems does Met.AI support?",
      answer: "Met.AI supports Ethereum, Solana, and Polygon, with cross-chain compatibility and integration with select Web2 APIs for real-world data and task execution."
    }
  ];

  return (
    <section id="faq" className={cn("py-32 w-full bg-zinc-900/50", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            FAQ
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 