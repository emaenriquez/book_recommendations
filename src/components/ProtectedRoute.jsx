import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/ContextGlobal";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useContext(GlobalContext);

  if (!userToken) { // Verificar si existe el token
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute