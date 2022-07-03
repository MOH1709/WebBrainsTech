import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoutes() {
  return (
    Cookies.get("token") ? <Outlet /> : <Navigate to="/login" />
  )
};