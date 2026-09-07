import React, { useEffect } from "react";
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

const HOME_TITLE =
  "AI-Powered School ERP Software | School Management System | EduAitor";
const HOME_DESCRIPTION =
  "EduAitor is an AI-powered School ERP Software that helps schools manage attendance, fees, examinations, communication, analytics, and AI-assisted learning from a single platform.";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

export default function Home() {
  useEffect(() => {
    document.title = HOME_TITLE;
    upsertMeta('meta[name="title"]', { name: "title", content: HOME_TITLE });
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: HOME_DESCRIPTION,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: HOME_TITLE,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: HOME_DESCRIPTION,
    });
  }, []);

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
