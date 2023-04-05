import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";

export function PrivateRouteLogin() {
  const [state] = useContext(UserContext);
  if (!state.isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRoutePatient() {
  const [state] = useContext(UserContext);

  if (state.user.listAs === "patient") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export function PrivateRouteDokter() {
  const [state] = useContext(UserContext);

  if (state.user.listAs === "doctor") {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}
