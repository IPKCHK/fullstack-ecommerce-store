// // import React from 'react'
// // import "./Navbar.css"
// // import {useNavigate} from "react-router-dom"
// // function Navbar() {
// //   const navigate=useNavigate();
// //   return (
// //     <div className='navbar'>
// //       <div className='logo'>
// //         E-commerce
// //       </div>
// //       <div className='use'>
// //         <button onClick={() => navigate("/cart")}>
// //                 Cart
// //         </button>
// //         <button onClick={() => navigate("/orders")}>
// //             Orders
// //         </button>
// //         <button className='login' onClick={()=>{navigate("/login")}}>Login</button>
// //         <button className='signup' onClick={()=>{navigate("/signup")}}>Signup</button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar;


// import React from 'react'
// import "./Navbar.css"
// import { useNavigate } from "react-router-dom"

// function Navbar() {
//   const navigate = useNavigate();

//   // Retrieve and parse the user data from localStorage
//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;

//   const handleLogout = () => {
//       // Clear storage and redirect to login
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/login");
//   };

//   return (
//     <div className='navbar'>
//       <div className='logo' onClick={() => navigate("/")} style={{cursor: "pointer"}}>
//         E-commerce
//       </div>
//       <div className='use'>
//         {user ? (
//             /* Show these when user IS logged in */
//             <>
//                 <span className="welcome-name">Hi, {user.name}</span>
//                 <button onClick={() => navigate("/cart")}>Cart</button>
//                 <button onClick={() => navigate("/orders")}>Orders</button>
//                 <button className='logout-btn' onClick={handleLogout}>Logout</button>
//             </>
//         ) : (
//             /* Show these when user is NOT logged in */
//             <>
//                 <button className='login' onClick={() => navigate("/login")}>Login</button>
//                 <button className='signup' onClick={() => navigate("/signup")}>Signup</button>
//             </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar;


// import React from 'react'
// import "./Navbar.css"
// import { useNavigate } from "react-router-dom"
// import { useAuthStore } from '../store/authStore'

// function Navbar() {
//   const navigate = useNavigate();
//   // Read user and logout action directly from Zustand
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//       logout();
//       navigate("/login");
//   };

//   return (
//     <div className='navbar'>
//       <div className='logo' onClick={() => navigate("/")} style={{cursor: "pointer"}}>
//         E-commerce
//       </div>
//       <div className='use'>
//         {user ? (
//             <>
//                 <span className="welcome-name">Hi, {user.name}</span>
//                 <button onClick={() => navigate("/cart")}>Cart</button>
//                 <button onClick={() => navigate("/orders")}>Orders</button>
//                 <button className='logout-btn' onClick={handleLogout}>Logout</button>
//             </>
//         ) : (
//             <>
//                 <button className='login' onClick={() => navigate("/login")}>Login</button>
//                 <button className='signup' onClick={() => navigate("/signup")}>Signup</button>
//             </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar;


import React from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from '../store/authStore'

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
      logout();
      navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className='logo' onClick={() => navigate("/")} style={{cursor: "pointer"}}>
        E-commerce
      </div>
      <div className='use'>
        {user ? (
            <>
                <span className="welcome-name">Hi, {user.name}</span>
                
                {/* ONLY show Add Product if the logged-in user is an admin */}
                {user.role === "admin" && (
                    <button onClick={() => navigate("/admin/add-product")}>Add Product</button>
                )}

                <button onClick={() => navigate("/cart")}>Cart</button>
                <button onClick={() => navigate("/orders")}>Orders</button>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
                <button className='login' onClick={() => navigate("/login")}>Login</button>
                <button className='signup' onClick={() => navigate("/signup")}>Signup</button>
            </>
        )}
      </div>
    </div>
  )
}

export default Navbar;