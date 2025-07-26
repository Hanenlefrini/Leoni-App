import React from "react";
import { Navigate } from "react-router-dom";

const ResponsableRoute = ({ children }) => {
  const technicienId = localStorage.getItem("technicienId");
  
  // Si technicienId existe (technicien connecté), on bloque l'accès Responsable et on redirige
  if (technicienId) {
    return <Navigate to="/dashboard-technicien" replace />;
  }
  
  // Sinon on autorise l'accès
  return children;
};

export default ResponsableRoute;
