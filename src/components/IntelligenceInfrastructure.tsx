"use client";

import { cn } from "@/lib/utils";
import { FC, useRef, useEffect } from "react";
import { 
  Network, 
  Shield, 
  Star,
  ArrowRight
} from "lucide-react";
import { useCardAnimation } from "@/lib/animations";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface InfrastructureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  index: number;
  isActive: boolean;
}

const InfrastructureCard: FC<InfrastructureCardProps> = ({
  title,
  description,
  icon,
  className,
  index,
  isActive
}) => {
  const cardId = `infra-card-${index}`;
  
  return (
    <div 
      id={cardId}
      className={cn(
        "p-4 sm:p-6 rounded-lg border transition-all duration-300",
        isActive 
          ? "bg-[#FFD700] border-[#FFC107] scale-[1.02]" 
          : "bg-zinc-900/50 border-zinc-800/50 hover:scale-[1.01]",
        className
      )}
      data-card-index={index}
    >
      <div className="flex flex-col items-start">
        <div className={cn(
          "icon-container p-2 sm:p-3 rounded-full mb-3 sm:mb-4",
          isActive 
            ? "bg-[#FFC107] text-black" 
            : "bg-zinc-800/80 text-[var(--theme-yellow)]"
        )}>
          {icon}
        </div>
        <h3 className={cn(
          "text-base sm:text-lg font-medium text-balance mb-2 sm:mb-3",
          isActive ? "text-black" : "text-white"
        )}>
          {title}
        </h3>
      </div>
      <div className="card-content">
        <p className={cn(
          "text-sm sm:text-base text-balance leading-relaxed",
          isActive ? "text-zinc-800" : "text-zinc-400"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};

interface IntelligenceInfrastructureProps {
  className?: string;
}

export const IntelligenceInfrastructure: FC<IntelligenceInfrastructureProps> = ({ className }) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const gridImageRef = useRef<HTMLDivElement>(null);
  const { initAnimations, cleanupAnimations } = useCardAnimation(cardsContainerRef, '[data-card-index]');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Grid image animation
    if (gridImageRef.current) {
      gsap.fromTo(
        gridImageRef.current,
        {
          filter: 'blur(20px)',
          opacity: 0.1,
          rotate: -60,
          scale: 0.5,
        },
        {
          filter: 'blur(0px)',
          opacity: 0.2,
          rotate: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridImageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
    }

    initAnimations();
    return () => cleanupAnimations();
  }, [initAnimations, cleanupAnimations]);

  return (
    <section id="infrastructure" className={cn("py-16 sm:py-20 md:py-24 lg:py-32 w-full bg-zinc-900/50", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse gap-8 sm:gap-12 lg:gap-16 justify-between">
          {/* Right column: Headings */}
          <div className="lg:w-2/5 flex flex-col justify-between">
            <div className="lg:sticky lg:top-36 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Intelligence <span className="text-[var(--theme-yellow)]">Infrastructure</span> Layer
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-xl text-balance leading-relaxed">
                It establishes the trust, interoperability, and execution integrity required to scale autonomous AI interactions across an open ecosystem.
              </p>
              
            </div>
            <div 
                ref={gridImageRef}
                className="relative w-full aspect-square max-w-[700px] mx-auto hidden lg:block"
              >
                <Image
                  src="/grid2.png"
                  alt="Decorative grid pattern"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
          </div>

          {/* Left column: Cards - vertical flex layout with divider */}
          <div className="lg:w-3/5 flex flex-row gap-0 relative">
            {/* Cards column */}
            <div ref={cardsContainerRef} className="flex flex-col gap-3 sm:gap-4 flex-1">
              <InfrastructureCard
                title="Multi-Agent Collaboration Protocol (MCP)"
                description="Met.AI leverages the MCP protocol to enable seamless coordination between AI agents. Task context is standardized and transmitted across agents, allowing for modular execution of complex workflows without redundant processing."
                icon={<Network size={20} className="sm:w-6 sm:h-6" />}
                index={0}
                isActive={false}
              />
              <InfrastructureCard
                title="Trusted Execution Environment (TEE)"
                description="Sensitive tasks are executed within TEE-based environments to ensure data confidentiality and code integrity. This guarantees that even off-chain model executions remain secure, verifiable, and free from tampering—critical for enterprise and privacy-sensitive use cases."
                icon={<Shield size={20} className="sm:w-6 sm:h-6" />}
                index={1}
                isActive={false}
              />
              <InfrastructureCard
                title="Reputation Layer & Credit Scoring"
                description="Each AI agent is assigned a dynamic on-chain credit score, calculated from execution history, response efficiency, and user feedback. This score enhances trust, improves ranking, and informs bidding results within the marketplace."
                icon={<Star size={20} className="sm:w-6 sm:h-6" />}
                index={2}
                isActive={false}
              />
            </div>
            {/* Vertical divider with sticky arrow */}
            <div className="relative mx-4 sm:mx-6 flex align-center justify-center">
              <div className="sticky top-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800/90 backdrop-blur-sm rounded-full border border-zinc-700/50 flex items-center justify-center text-[var(--theme-yellow)] animate-bounce z-10 shadow-lg hover:scale-110 transition-transform duration-300">
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] animate-pulse rotate-180" />
              </div>
              <div className="absolute top-0 w-[2px] sm:w-[3px] bg-zinc-800" style={{ minHeight: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceInfrastructure; 