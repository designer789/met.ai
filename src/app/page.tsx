import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AgentMarketplace from "@/components/AgentMarketplace";
import IntelligenceInfrastructure from "@/components/IntelligenceInfrastructure";
import WhyMetai from "@/components/WhyMetAI";
import Tokenomics from "@/components/Tokenomics";
import { Roadmap } from '@/components/Roadmap';
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <AgentMarketplace />
      <IntelligenceInfrastructure />
      <WhyMetai />
      <Tokenomics />
      <Roadmap />
      <FAQ />
    </div>
  );
}
