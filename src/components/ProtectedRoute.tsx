import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // 'student', 'officer', 'recruiter', 'admin'
  const location = useLocation();

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    // If authenticated but the role is not allowed, redirect to their default home
    console.warn(`Access denied for role: ${userRole}. Allowed roles: ${allowedRoles}`);
    
    if (userRole === "student") return <Navigate to="/student/dashboard" replace />;
    if (userRole === "officer") return <Navigate to="/officer/dashboard" replace />;
    if (userRole === "recruiter") return <Navigate to="/recruiter/dashboard" replace />;
    if (userRole === "admin") return <Navigate to="/admin" replace />;

    // fallback
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
