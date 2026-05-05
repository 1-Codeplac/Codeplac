import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser.role || savedUser.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;