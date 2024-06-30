import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import styles from './ProtectedRoute.module.css'

export default function ProtectedRoute({ Component }) {
    const [token] = useState(localStorage.getItem("token"));
    let [isLoggedIn, setIsLoggedIn] = useState(!!token);

    const autoLogoutMessage = "Your session has expired. For security reasons, you have been logged out. Please log in again to continue accessing the application.";

    if (isLoggedIn) {
        const tokenExp = new Date(JSON.parse(atob(token.split(".")[1])).exp * 1000);
        if (tokenExp < new Date()) {
            setIsLoggedIn(false);
            localStorage.clear();
            toast.success(autoLogoutMessage, {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                className: styles.custom_logout_toast,
            });
        }
    }

    return <>{isLoggedIn ? <Component /> : <Navigate to="/auth/login" />}</>;
}