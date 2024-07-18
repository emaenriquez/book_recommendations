import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(GlobalContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
