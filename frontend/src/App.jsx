// import { Routes,Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import ProductPage from "./pages/ProductPage";
// import Navbar from "./components/Navbar";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import AddProduct from "./pages/admin/AddProduct";
// import AdminRoute from "./components/AdminRoute";
// import CartPage from "./pages/CartPage";
// import OrdersPage from "./pages/OrdersPage";

// function App(){
//     return (
//       <div className="app">
//         <Navbar/>
//         <Routes>
//           <Route path="/" element={<HomePage/>}/>
//           <Route path="/product/:id" element={<ProductPage/>}/>
//           <Route path="/login" element={<LoginPage/>}/>
//           <Route path="/signup" element={<SignupPage/>}/>
//           <Route
//               path="/admin/add-product"
//               element={
//                   <AdminRoute>
//                       <AddProduct />
//                   </AdminRoute>
//               }
//           />
//           <Route path="/cart" element={<CartPage/>}/>
//           <Route path="/orders" element={<OrdersPage />} />
//         </Routes>
//       </div>
//     );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginView";
import SignupPage from "./pages/SignupPage";
import AddProduct from "./pages/admin/AddProduct";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { useAuthStore } from "./store/authStore";

function App(){
    // Check if user is already logged in to prevent them from seeing the login/signup pages
    // const isAuthenticated = !!localStorage.getItem("token");
    const { user } = useAuthStore();
    const isAuthenticated = !!user;
    return (
      <div className="app">
        <Navbar/>
        <Routes>
          {/* Public Routes - Anyone can access */}
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          
          {/* Auth Routes - Redirect to home if already logged in */}
          <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <LoginPage/>}
          />
          <Route 
              path="/signup" 
              element={isAuthenticated ? <Navigate to="/" /> : <SignupPage/>}
          />

          {/* Protected User Routes - Must be logged in */}
          <Route 
              path="/cart" 
              element={
                  <ProtectedRoute>
                      <CartPage/>
                  </ProtectedRoute>
              }
          />
          <Route 
              path="/orders" 
              element={
                  <ProtectedRoute>
                      <OrdersPage />
                  </ProtectedRoute>
              }
          />

          {/* Admin Routes - Must be admin */}
          <Route
              path="/admin/add-product"
              element={
                  <AdminRoute>
                      <AddProduct />
                  </AdminRoute>
              }
          />

          <Route path="*" element={
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <h2>404 - Page Not Found</h2>
                    <p>The URL you typed does not exist.</p>
                </div>
            } />
        </Routes>
      </div>
    );
}

export default App;