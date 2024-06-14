import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../hooks/getUser";
import Spinner from "../components/spinner/Spinner";

export default function PrivateRoute() {
  const { currentUser, loading } = getUser();

  if (loading) {
    return <Spinner />;
  }

  return currentUser !== null ? <Outlet /> : <Navigate to={"/login"} />;
}
