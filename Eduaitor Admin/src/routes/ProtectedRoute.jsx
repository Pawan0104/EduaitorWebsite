import { Navigate } from "react-router-dom";
import { hasValidAdminToken } from "../lib/api";

const ProtectedRoute = ({ children }) => {
  return hasValidAdminToken() ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
