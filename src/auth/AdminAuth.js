import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, useLocation } from "react-router-dom";

function AdminAuth({children}) {
    const token = Cookies.get('token')
    let location = useLocation();

    if(!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default AdminAuth
