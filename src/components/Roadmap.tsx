'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface Phase {
  title: string;
  items: string[];
}

const phases: Phase[] = [
  {
    title: 'Phase 1: Protocol Foundation',
    items: [
      'Design and deploy the core smart contract infrastructure',
      'Launch the AI agent matching and bidding system (MVP)',
      'Release Model Context Protocol (MCP) for multi-agent coordination',
      'Integrate reputation and credit scoring mechanisms',
      'Launch the $MET token',
    ],
  },
  {
    title: 'Phase 2: Ecosystem Expansion',
    items: [
      'Launch custom agent development and milestone-based payment module',
      'Deploy subscription smart contracts for long-term AI services',
      'Open developer marketplace and onboarding tools',
      'Begin integration with Solana, Ethereum, Polygon, and Web2 APIs',
      'Establish incentive programs for agent providers and early adopters',
    ],
  },
  {
    title: 'Phase 3: Intelligence Layer & Interoperability',
    items: [
      'Launch TEE-secured agent execution for privacy-sensitive tasks',
      'Implement full MCP-based multi-agent task routing and optimization',
      'Expand support for decentralized storage (IPFS/Arweave) and off-chain task logs',
      'Enable composability with DeFi protocols and NFT-based AI outputs',
      'Deploy advanced dashboard with analytics and agent performance tracking',
    ],
  },
  {
    title: 'Phase 4: Governance & Decentralization',
    items: [
      'Transition to DAO-based governance using $MET staking and voting',
      'Launch community proposal system and treasury management',
      'Establish multi-chain bridges for task and agent mobility',
      'Launch ecosystem grant program to support third-party agent development',
      'Host hackathons and incubator programs for AI+Web3 innovation',
    ],
  },
];

export const Roadmap: FC = () => {
  const [activePhase, setActivePhase] = useState<number>(0);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      // Initial state for all phases
      gsap.set(phaseRefs.current, {
        opacity: 0.5,
      });

      // Create scroll triggers for each phase
      phases.forEach((_, index) => {
        const phase = phaseRefs.current[index];
        if (!phase) return;

        ScrollTrigger.create({
          trigger: phase,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            // Reset all phases to default state
            gsap.to(phaseRefs.current, {
              opacity: 0.5,
              duration: 0.3,
              ease: 'power2.out'
            });
            // Animate current phase to active state
            gsap.to(phase, {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
            setActivePhase(index);
          },
          onLeave: () => {
            gsap.to(phase, {
              opacity: 0.5,
              duration: 0.3,
              ease: 'power2.out'
            });
          },
          onEnterBack: () => {
            // Reset all phases to default state
            gsap.to(phaseRefs.current, {
              opacity: 0.5,
              duration: 0.3,
              ease: 'power2.out'
            });
            // Animate current phase to active state
            gsap.to(phase, {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
            setActivePhase(index);
          },
          onLeaveBack: () => {
            gsap.to(phase, {
              opacity: 0.5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="roadmap" className={cn("py-16 sm:py-20 md:py-24 lg:py-32 w-full bg-zinc-900/50")}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {/* Left Column - Heading */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="sticky top-32 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Roadmap
              </h2>
            </div>
            <div 
              ref={gridImageRef}
              className="relative w-full aspect-square max-w-[700px] mx-auto hidden lg:block"
            >
              <Image
                src="/grid3.png"
                alt="Decorative grid pattern"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8" ref={sectionRef}>
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 relative">
              {/* Left column: Timeline */}
              <div className="flex flex-row gap-0 relative">
                {/* Timeline column */}
                {/* Vertical divider with sticky arrow */}
                <div className="relative mx-4 sm:mx-6 flex align-center justify-center">
                  <div className="sticky top-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800/90 backdrop-blur-sm rounded-full border border-zinc-700/50 flex items-center justify-center text-[var(--theme-yellow)] animate-bounce z-10 shadow-lg hover:scale-110 transition-transform duration-300">
                    <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] animate-pulse rotate-180" />
                  </div>
                  <div className="absolute top-0 w-[2px] sm:w-[3px] bg-zinc-800" style={{ minHeight: '100%' }} />
                </div>
                <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 flex-1">
                  {phases.map((phase, index) => (
                    <div
                      key={phase.title}
                      ref={(el) => {
                        phaseRefs.current[index] = el;
                      }}
                      className="relative pl-6 sm:pl-8"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                        <span className={cn(
                          "text-base sm:text-lg font-semibold",
                          index === 0 ? "text-blue-400" :
                          index === 1 ? "text-purple-400" :
                          index === 2 ? "text-emerald-400" :
                          "text-[var(--theme-yellow)]"
                        )}>Phase {index + 1}</span>
                        <ChevronRight size={16} className="sm:w-5 sm:h-5 text-zinc-600" />
                        <span className="text-base sm:text-lg">{phase.title.split(': ')[1]}</span>
                      </h3>
                      <ul className="space-y-3 sm:space-y-4">
                        {phase.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-sm sm:text-base text-zinc-400 flex items-start gap-2 sm:gap-3 group/item"
                          >
                            <span className="text-[var(--theme-yellow)] mt-1.5">•</span>
                            <span className="group-hover/item:text-zinc-300 transition-colors duration-300 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {index < phases.length - 1 && (
                        <div className="h-px bg-zinc-800/50 my-8 sm:my-10 lg:my-12" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 