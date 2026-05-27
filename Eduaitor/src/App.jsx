import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SolutionPage from "./Pages/SolutionPage";
import ScrollToTop from "./Components/ScrollToTop";
import CursorCircle from "./Components/CursorCircle";
import Plans from "./Pages/Plans";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/footer/Footer";
import BookDemoPage from "./Pages/BookDemoPage";
import Marketplace from "./Pages/MarketPlace";
import LegalPage from "./Pages/LegalPage";

const App = () => {
  return (
    <>
      <CursorCircle />
      <ScrollToTop />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* <Route path='/bookademo' element={<BookDemo />} /> */}
          <Route path="/plans" element={<Plans />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/bookademo" element={<BookDemoPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
