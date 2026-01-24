import { useAuth } from "./AuthContext";

// to wrap around children component so that they only appear if signed in.
function ProtectedComponent({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  return user ? children : null;
}

export default ProtectedComponent;