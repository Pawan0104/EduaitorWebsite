import React from "react";
import HeroSection from "../Components/Homepage-Components/HeroSection";
import RealImpactSection from "../Components/Homepage-Components/RealImpactSection";
import ChallengeSection from "../Components/Homepage-Components/ChallengeSection";
import SolutionSection from "../Components/Homepage-Components/SolutionSection";
import EcosystemGridSection from "../Components/Homepage-Components/EcosystemGridSection";
import StakeholdersSection from "../Components/Homepage-Components/StakeholdersSection";
import WhatMakesDifferentSection from "../Components/Homepage-Components/WhatMakesDifferentSection";
import PurposeSection from "../Components/Homepage-Components/PurposeSection";
import DifferenceSection from "../Components/Homepage-Components/DifferenceSection";
import PricingOneSection from "../Components/Homepage-Components/PricingOneSection";
import ImpactLoopSection from "../Components/Homepage-Components/ImpactLoopSection";
import FutureCtaSection from "../Components/Homepage-Components/FutureCtaSection";

export default function Home() {
  return (
    <div className="hm-root">
      {/* home-1 */}
      <HeroSection />
      {/* home-2 */}
      <RealImpactSection />
      {/* home-3 */}
      <ChallengeSection />
      {/* home-4 */}
      <SolutionSection />
      {/* home-5 */}
      <EcosystemGridSection />
      {/* home-6 */}
      <StakeholdersSection />
      {/* home-7 */}
      <WhatMakesDifferentSection />
      {/* home-8 */}
      <PurposeSection />
      {/* home-9 */}
      <DifferenceSection />
      {/* home-10 */}
      <PricingOneSection />
      {/* home-11 */}
      <ImpactLoopSection />
      {/* home-12 */}
      <FutureCtaSection />
    </div>
  );
}
