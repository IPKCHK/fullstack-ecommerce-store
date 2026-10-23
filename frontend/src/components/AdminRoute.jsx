// import React from "react";
// import { Navigate } from "react-router-dom";

// function AdminRoute({ children }) {

//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!token) {
//         return <Navigate to="/login" />;
//     }

//     if (user?.role !== "admin") {
//         return <Navigate to="/" />;
//     }

//     return children;
// }

// export default AdminRoute;

// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// const AdminRoute = ({ children }) => {
//     const { user } = useAuthStore();

//     // If not logged in, OR if the user is not an admin, kick them to the homepage
//     if (!user || user.role !== "admin") {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default AdminRoute;



import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./AdminRoute.css"

const AdminRoute = ({ children }) => {
    const { user } = useAuthStore();

    // Check if completely logged out
    if (!user) {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <h2>Admin Access Only</h2>
                <p>Please log in with an administrator account.</p>
                <Link to="/login">
                    <button className="mynewbutton">
                        Go to Login
                    </button>
                </Link>
            </div>
        );
    }

    // Check if logged in, but NOT an admin
    if (user.role !== "admin") {
        return (
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
                <Link to="/">
                    <button className="mynewbutton">
                        Return Home
                    </button>
                </Link>
            </div>
        );
    }

    return children;
};

export default AdminRoute;