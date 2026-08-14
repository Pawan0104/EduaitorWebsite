import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SolutionPage from "./Pages/SolutionPage";
import EcosystemPage from "./Pages/EcosystemPage";
import ScrollToTop from "./Components/ScrollToTop";
import Plans from "./Pages/Plans";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/footer/Footer";
import BookDemoPage from "./Pages/BookDemoPage";
import Marketplace from "./Pages/MarketPlace";
import LegalPage from "./Pages/LegalPage";
import PolicyPage from "./Pages/PolicyPage";
import WhyEduAitorPage from "./Pages/WhyEduAitorPage";
import { ContactPopupProvider } from "./Components/ContactPopup";
import { getSettingsCached } from "./lib/settingsCache";

const App = () => {
  useEffect(() => {
    getSettingsCached().catch(() => {});
  }, []);

  return (
    <ContactPopupProvider>
      <ScrollToTop />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/bookademo" element={<BookDemoPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route
            path="/privacy-policy"
            element={<PolicyPage policyKey="privacyPolicy" />}
          />
          <Route
            path="/terms-and-conditions"
            element={<PolicyPage policyKey="termsOfUse" />}
          />
          <Route
            path="/refund-policy"
            element={<PolicyPage policyKey="refundPolicy" />}
          />
          <Route
            path="/help-center"
            element={
              <PolicyPage policyKey="helpCenter" section="resources" />
            }
          />
          <Route
            path="/knowledge-base"
            element={
              <PolicyPage policyKey="knowledgeBase" section="resources" />
            }
          />
          <Route
            path="/blogs"
            element={<PolicyPage policyKey="blogs" section="resources" />}
          />
          <Route
            path="/case-studies"
            element={
              <PolicyPage policyKey="caseStudies" section="resources" />
            }
          />
          <Route
            path="/webinars"
            element={<PolicyPage policyKey="webinars" section="resources" />}
          />
          <Route
            path="/downloads"
            element={
              <PolicyPage policyKey="downloads" section="resources" />
            }
          />
          <Route
            path="/whats-new"
            element={<PolicyPage policyKey="whatsNew" section="resources" />}
          />
          <Route
            path="/about-us"
            element={<PolicyPage policyKey="aboutUs" section="company" />}
          />
          <Route
            path="/our-mission"
            element={<PolicyPage policyKey="ourMission" section="company" />}
          />
          <Route
            path="/our-team"
            element={<PolicyPage policyKey="ourTeam" section="company" />}
          />
          <Route
            path="/careers"
            element={<PolicyPage policyKey="careers" section="company" />}
          />
          <Route
            path="/partners"
            element={<PolicyPage policyKey="partners" section="company" />}
          />
          <Route path="/why" element={<WhyEduAitorPage />} />
        </Routes>
      </div>
      <Footer />
    </ContactPopupProvider>
  );
};

export default App;
