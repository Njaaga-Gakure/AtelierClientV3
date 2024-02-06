import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedSellerRoutes = () => {
  const { user } = useAppSelector((store) => store.user);
  if (user) {
    const { role } = user;
    if (role === "seller") {
      return <Outlet />;
    } else if (role === "admin") {
      return <Navigate to="/admin-panel" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return <Navigate to="/register" />;
};

export default ProtectedSellerRoutes;
