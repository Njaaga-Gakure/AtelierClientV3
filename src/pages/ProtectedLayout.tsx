import { type ReactNode, type FC } from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";
type ProtectedLayoutProps = {
  children: ReactNode;
};

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);

  if (user) {
    const { role } = user;
    if (role === "seller" || role === "bidder") {
      return children;
    }
    return <Navigate to="/admin-panel" />;
  }
  return <Navigate to="/register" />;
};

export default ProtectedLayout;
