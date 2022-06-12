import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = () => {
  const { isSignedIn } = useAuth();

  const location = useLocation();

  return (
    <div className="safe" style={{ marginTop: 120, padding: 20 }}>
      {isSignedIn ? <Outlet /> : <Navigate to="/" state={{ from: location }} />}
    </div>
  );
};

export default AdminRoute;
