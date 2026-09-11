import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";
import BrainLeague from "./pages/brainLeague/BrainLeague";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrainLeague />
    </ErrorBoundary>
    <ToastContainer
      position="top-right"
      autoClose={2500}
      limit={3}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      style={{ zIndex: 100000 }}
      toastStyle={{ zIndex: 100000, fontSize: "0.875rem" }}
    />
  </StrictMode>,
);