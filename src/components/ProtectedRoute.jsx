// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { canAccess, rolesForPath } from "../auth/accessControl";

export default function ProtectedRoute({ children, requiredRoles }) {
  const { isConnected, roles } = useAuth();
  const location = useLocation();

  if (!isConnected) {
    return (
      <Navigate
        to="/connect"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const rolesNeeded = requiredRoles && requiredRoles.length
    ? requiredRoles
    : rolesForPath(location.pathname);

  if (!canAccess(rolesNeeded, roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
