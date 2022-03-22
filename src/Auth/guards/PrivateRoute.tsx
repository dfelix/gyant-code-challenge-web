import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ redirectTo = "/auth", children }: any) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
