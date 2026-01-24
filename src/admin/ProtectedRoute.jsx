import Spinner from "../utils/Spinner";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;