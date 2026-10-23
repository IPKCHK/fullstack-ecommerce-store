// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//     const token = localStorage.getItem("token");

//     // If there is no token, redirect to the login page immediately
//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }

//     // If logged in, allow them to see the page
//     return children;
// }

// export default ProtectedRoute;

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./ProtectedRoute.css"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuthStore();

    // If no user is logged in, display this message instead of the page
    if (!user) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <h2>Login Required</h2>
                <p>You must be logged in to view your cart and orders.</p>
                <Link to="/login">
                    <button className="mynewbutton">
                        Go to Login
                    </button>
                </Link>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;