import { Outlet } from "react-router";
import { useAuth } from "./useAuth";
import { Welcome } from "../../components/Welcome/Welcome";
import {Home} from "../../components/Home/Home";

export const LoginRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Welcome />;
};

export const OutLoginRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Home /> : <Outlet />;
};
