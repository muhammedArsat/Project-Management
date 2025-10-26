import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("AuthContext is not provided");
    return <Navigate to="/" />;
  }

  if (context?.isLoading) {
    return (
      <span className="min-h-screen flex justify-center items-center">
        <Loader />
      </span>
    );
  }

  if (!context.auth.email) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
