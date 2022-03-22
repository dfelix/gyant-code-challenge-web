import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PublicRoute = ({ children }: any) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated() ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
