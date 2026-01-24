import Spinner from "../utils/Spinner";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";


function ProtectedRoute() {
  const { user, loading } = useAuth();
  console.log('This is ProtectedRoute.')
  // if (loading) return <Spinner />;
  if (loading){
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;