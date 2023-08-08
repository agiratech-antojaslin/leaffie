import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const user = useSelector((state) => state.user);
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated)
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } 
  return children;
};

export default ProtectedRoute;
