import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";

const ProtectedRoute = () => {
    const { auth, persist }: any = useAuth();
    const location = useLocation();
    console.log('accessing protected route')
    console.log(auth)
    console.log(auth.user)


    return (
        persist ? <Outlet /> :
            auth?.user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default ProtectedRoute;