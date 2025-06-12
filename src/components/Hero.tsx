"use client";

import Image from 'next/image';
import EnhancedText from './EnhancedText';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export default function Hero() {
  const cube1Ref = useRef<HTMLDivElement>(null);
  const cube2Ref = useRef<HTMLDivElement>(null);
  const cube3Ref = useRef<HTMLDivElement>(null);
  const cube4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate cube1
    gsap.to(cube1Ref.current, {
      y: '20%',
      rotation: 15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Animate cube2
    gsap.to(cube2Ref.current, {
      y: '-20%',
      rotation: -15,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Animate cube3
    gsap.to(cube3Ref.current, {
      x: '15%',
      rotation: 20,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Animate cube4
    gsap.to(cube4Ref.current, {
      x: '-15%',
      rotation: -20,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center bg-zinc-900 py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/video/v2.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-900/20 to-zinc-900/80" />
      </div>

      {/* Decorative Cubes */}
      <div 
        ref={cube1Ref}
        className="absolute left-[5%] sm:left-[10%] top-[15%] sm:top-[20%] w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none opacity-50 sm:opacity-100"
      >
        <Image
          src="/cube1.png"
          alt="Decorative Cube"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div 
        ref={cube2Ref}
        className="absolute right-[5%] sm:right-[10%] bottom-[15%] sm:bottom-[20%] w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 pointer-events-none opacity-50 sm:opacity-100"
      >
        <Image
          src="/cube2.png"
          alt="Decorative Cube"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div 
        ref={cube3Ref}
        className="absolute left-[15%] sm:left-[25%] bottom-[10%] sm:bottom-[15%] w-24 sm:w-32 h-24 sm:h-32 pointer-events-none opacity-50 sm:opacity-100"
      >
        <Image
          src="/cube4.png"
          alt="Decorative Cube"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div 
        ref={cube4Ref}
        className="absolute right-[15%] sm:right-[25%] top-[10%] sm:top-[15%] w-32 sm:w-48 h-32 sm:h-48 pointer-events-none opacity-50 sm:opacity-100"
      >
        <Image
          src="/cube3.png"
          alt="Decorative Cube"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <EnhancedText 
              texts={[
                "Agents Unleashed.",
                "Markets Decentralized.",
                "Intelligence on Demand."
              ]}
              rotationInterval={3000}
              highlightBorderColor="#facc15"
              highlightGlowColor="rgba(250, 204, 21, 0.6)"
              highlightPadding={18}
              cornerSize={18} 
              className="flex-col items-center justify-center"
              textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
              highlightClassName="z-0"
            />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
            Met.AI is a decentralized AI agent marketplace enabling trustless task matching, 
            bidding, custom agent development, and service subscriptions—all powered by 
            smart contracts. It bridges blockchain and AI to build an open and flexible 
            infrastructure for the new AI economy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-6 md:px-8">
            <a href="https://t.me/Met_AI_Official" target="_blank" rel="noopener noreferrer">
            <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-6 sm:px-8 py-3 rounded-md font-medium transition-colors text-sm sm:text-base hover: cursor-pointer">
              Join our Community
            </button>
            </a>
            <a href="https://docs.metcoin.xyz" target="_blank" rel="noopener noreferrer">
            <button className="w-full sm:w-auto bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 sm:px-8 py-3 rounded-md font-medium transition-colors text-sm sm:text-base hover: cursor-pointer ">
              Documentation
            </button>
            </a>
          
          </div>
        </div>
      </div>
    </section>
  );
} 