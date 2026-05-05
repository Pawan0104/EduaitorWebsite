import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Plan from "./pages/Plan";
import Setting from "./pages/Setting";
import Demos from "./pages/Demos";
import Institute from "./pages/Institute";
import Testimonials from "../src/pages/Testimonials";
import Award from "./pages/Award";

const ComingSoon = ({ name }) => (
  <div className="flex items-center justify-center min-h-[60vh] t-base">
    <div className="text-center">
      {/* Uses your t-accent-bg and t-accent-text classes */}
      <div className="w-14 h-14 border rounded-2xl flex items-center justify-center mx-auto mb-4 t-accent-bg">
        <svg
          className="w-6 h-6 t-accent-text"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
      </div>

      {/* Uses your t-text and t-text-sec classes */}
      <h2 className="font-black text-xl mb-2 t-text">{name}</h2>
      <p className="text-sm font-medium t-text-sec">
        This page is under construction.
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="plan" element={<Plan />} />
        <Route path="demo" element={<Demos />} />
        {/* <Route path="team" element={<ComingSoon name="Team" />} />
        <Route path="visit" element={<ComingSoon name="Visits" />} /> */}
        <Route path="contact" element={<ComingSoon name="Contacts" />} />
        <Route path="institute" element={<Institute />} />
        <Route path="testimonial" element={<Testimonials />} />
        <Route path="award" element={<Award />} />
        <Route path="gallery" element={<ComingSoon name="Gallery" />} />
        <Route path="blog" element={<ComingSoon name="Blogs" />} />
        <Route path="setting" element={<Setting />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
