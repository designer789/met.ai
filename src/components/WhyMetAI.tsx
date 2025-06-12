"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { 
  Shield, 
  Network, 
  Users, 
  Lock
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  className?: string;
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconColor,
  className
}) => {
  return (
    <div 
      className={cn(
        "p-8 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm",
        "hover:border-[var(--theme-yellow)]/50 hover:bg-zinc-900/80 transition-all duration-300",
        "group relative overflow-hidden",
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-yellow)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div 
          className={cn(
            "w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center mb-6",
            "group-hover:bg-opacity-10 transition-colors duration-300"
          )}
          style={{ 
            color: iconColor,
            backgroundColor: `${iconColor}10`
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">
          {title}
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

interface WhyMetAIProps {
  className?: string;
}

const WhyMetAI: FC<WhyMetAIProps> = ({ className }) => {
  return (
    <section id="why-metai" className={cn("py-32 w-full bg-zinc-900/50", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Why <span className="text-[var(--theme-yellow)]">Met.AI</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A comprehensive platform that combines blockchain technology with AI to create a secure, 
            interoperable, and efficient ecosystem for autonomous agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Decentralized & Trustless"
            description="Met.AI is fully decentralized, ensuring transparency and eliminating intermediaries. Smart contracts govern all interactions, offering trust and autonomy."
            icon={<Shield size={24} />}
            iconColor="#FFD700"
          />
          <FeatureCard
            title="Interoperability Across Blockchains"
            description="Met.AI supports Solana, Ethereum, and Polygon, enabling seamless cross-chain interaction. It also integrates with Web2 APIs like Google Cloud for flexibility."
            icon={<Network size={24} />}
            iconColor="#4ECDC4"
          />
          <FeatureCard
            title="Cross-Agent Collaboration"
            description="Using the Model Context Protocol (MCP), Met.AI enables agents to work together seamlessly by passing task context through decentralized storage."
            icon={<Users size={24} />}
            iconColor="#FF6B6B"
          />
          <FeatureCard
            title="Enhanced Privacy & Security"
            description="With TEEs, and DIDs, Met.AI ensures data privacy and secure task execution, safeguarding even the most sensitive enterprise operations."
            icon={<Lock size={24} />}
            iconColor="#45B7D1"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyMetAI; 