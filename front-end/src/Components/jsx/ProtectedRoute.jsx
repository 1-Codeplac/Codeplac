import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleExigida }) => {
  
  const isAuthenticated = true; 
  const cargoDoUsuario = "admin"; 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roleExigida && cargoDoUsuario !== roleExigida) {
    alert("Acesso Negado: Área restrita para administradores.");
    return <Navigate to="/perfil" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;