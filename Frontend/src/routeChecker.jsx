import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const user = localStorage.getItem("auth_token") !== null ? true : null;

  return user ? <Outlet /> : <Navigate to={"/"} />;
};
export default ProtectedRoute;
