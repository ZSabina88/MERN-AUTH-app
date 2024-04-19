import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ token = false }) {
    // let auth = { token: true };

    return (
        token ? <Navigate to="/" /> : <Outlet />
        // auth.token ? <Outlet /> : <Navigate to="/" />
    );
}
