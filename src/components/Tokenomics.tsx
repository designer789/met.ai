"use client";

import { cn } from "@/lib/utils";
import { FC, useState, useEffect, useRef } from "react";
import { 
  Coins,
  Users,
  Code2,
  Lock,
  Megaphone,
  UsersRound,
  Zap,
  Vote,
  Wallet,
  ArrowRight,
  ChevronDown
} from "lucide-react";

interface AllocationItemProps {
  label: string;
  percentage: number;
  color: string;
  className?: string;
}

const AllocationItem: FC<AllocationItemProps> = ({
  label,
  percentage,
  color,
  className
}) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-zinc-300">{label}</span>
          <span className="text-sm text-zinc-400">{percentage}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  title,
  description,
  isActive,
  onClick
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [description]);

  return (
    <div 
      className={cn(
        "border-b border-zinc-800/50 transition-all duration-300",
        isActive ? "border-[var(--theme-yellow)]/50" : ""
      )}
    >
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <h4 className={cn(
          "text-lg font-medium transition-colors duration-300",
          isActive ? "text-[var(--theme-yellow)]" : "text-white"
        )}>
          {title}
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
        <div ref={contentRef} className="pb-4">
          <p className="text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface TokenomicsProps {
  className?: string;
}

const Tokenomics: FC<TokenomicsProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const utilities = [
    {
      title: "Access to AI Services",
      description: "Use $MET to pay for agent matching、custom AI development、and subscription-based services across the marketplace."
    },
    {
      title: "AI Contribution Incentives",
      description: "Developers and agent providers earn $MET as rewards for publishing, maintaining, and successfully completing tasks through AI agents—fueling an open and competitive AI economy."
    },
    {
      title: "Staking & Rewards",
      description: "Stake $MET to earn staking rewards, participate in governance, and unlock enhanced platform features."
    },
    {
      title: "Transaction & Bidding Fees",
      description: "$MET is used to cover service fees, task bidding, and execution settlements across the platform."
    },
    {
      title: "Governance Participation",
      description: "$MET holders can vote on key platform decisions, including protocol upgrades and feature implementations."
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % utilities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, utilities.length]);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="tokenomics" className={cn("py-32 w-full bg-zinc-900/50", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Tokenomics
          </h2>
          <div className="flex flex-col items-center gap-2 text-xl text-zinc-400">
            <div className="flex items-center gap-2">
              <span>Token Name:</span>
              <span className="text-[var(--theme-yellow)]">$MET</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Total Supply:</span>
              <span>1,000,000,000 $MET</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Token Allocation */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Token Allocation
            </h3>
            <div className="space-y-6">
              <AllocationItem 
                label="Fair Launch" 
                percentage={60} 
                color="#FFD700"
              />
              <AllocationItem 
                label="Ecosystem & Partnerships" 
                percentage={10} 
                color="#FFA500"
              />
              <AllocationItem 
                label="AI Developer Incentives" 
                percentage={15} 
                color="#FF6B6B"
              />
              <AllocationItem 
                label="Staking Rewards" 
                percentage={5} 
                color="#4ECDC4"
              />
              <AllocationItem 
                label="Marketing & Community" 
                percentage={5} 
                color="#45B7D1"
              />
              <AllocationItem 
                label="Team & Advisors" 
                percentage={5} 
                color="#96CEB4"
              />
            </div>
          </div>

          {/* Right Column: Utility Accordion */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Utility
            </h3>
            <div className="space-y-2">
              {utilities.map((utility, index) => (
                <AccordionItem
                  key={utility.title}
                  title={utility.title}
                  description={utility.description}
                  isActive={index === activeIndex}
                  onClick={() => handleAccordionClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics; 