import { Navigate, Outlet, useLocation } from "react-router-dom";
import Tabbar from "../../components/Tabbar";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = () => {
  const { isSignedIn } = useAuth();

  const location = useLocation();

  return (
    <div className="safe" style={{ marginTop: 120, padding: 20 }}>
      <Tabbar />
      {isSignedIn ? <Outlet /> : <Navigate to="/" state={{ from: location }} />}
    </div>
  );
};

export default AdminRoute;
