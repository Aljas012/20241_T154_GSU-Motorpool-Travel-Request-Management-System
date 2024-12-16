import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // Retrieve tokens and parse admin info
  const user = localStorage.getItem("auth_token");
  const admin = JSON.parse(localStorage.getItem("admin_info")); // Parse admin info
  const adminToken = admin?.admin_token; // Safely access admin_token

  // Check admin token
  if (adminToken) {
    return <Outlet />;
  }

  // Check user token
  if (user) {
    return <Outlet />;
  }

  // Redirect if neither token is present
  return <Navigate to="/" />;
};

export default ProtectedRoute;
