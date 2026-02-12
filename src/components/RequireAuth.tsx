import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "@/lib/auth";

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
