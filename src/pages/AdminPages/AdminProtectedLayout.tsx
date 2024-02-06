import { type ReactNode, type FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

type AdminProtectedLayoutProps = {
  children: ReactNode;
};
const AdminProtectedLayout: FC<AdminProtectedLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);
  if (user) {
    const { role } = user;
    if (role === "admin") {
      return children;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/register" />;
};

export default AdminProtectedLayout;
