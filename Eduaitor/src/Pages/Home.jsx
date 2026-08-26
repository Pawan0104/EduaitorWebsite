import React from "react";
import HeroSection from "../Components/Homepage-Components/HeroSection";
import IgniteXHighlight from "../Components/Homepage-Components/IgniteXHighlight";
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
      <HeroSection />
      <IgniteXHighlight />
      <RealImpactSection />
      <ChallengeSection />
      <SolutionSection />
      <EcosystemGridSection />
      <StakeholdersSection />
      <WhatMakesDifferentSection />
      <PurposeSection />
      <DifferenceSection />
      <PricingOneSection />
      <ImpactLoopSection />
      <FutureCtaSection />
    </div>
  );
}
