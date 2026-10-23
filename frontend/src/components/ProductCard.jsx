// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductCard.css";

// function ProductCard({ product }) {

//     const navigate = useNavigate();

//     const handleProductClick = () => {
//         navigate(`/product/${product.id}`);
//     };

//     const handleAddToCart = async (e) => {
//     e.stopPropagation();

//     const token = localStorage.getItem("token");

//     if (!token) {
//         alert("Please login to add products to cart");
//         return;
//     }

//     try {
//         const response = await fetch(
//             "http://localhost:3000/api/cart",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({
//                     productId: product.id
//                 })
//             }
//         );

//         const data = await response.json();

//         if (response.ok) {
//             alert("Product added to cart");
//         } else {
//             alert(data.message || "Failed to add product");
//         }

//     } catch (error) {
//         console.log("Add to cart error:", error);
//     }
// };

//     return (
//         <div
//             className="product-card"
//             onClick={handleProductClick}
//         >

//             <img
//                 src={product.image}
//                 alt={product.name}
//             />

//             <h3>{product.name}</h3>

//             <p>₹{product.price}</p>

//             <div className="product-card-buttons">

//                 <button
//                     onClick={handleProductClick}
//                 >
//                     View Product
//                 </button>

//                 <button
//                     onClick={handleAddToCart}
//                 >
//                     Add to Cart
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Adjust path if your components folder is elsewhere
import { useAuthStore } from "../store/authStore";
import "./ProductCard.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { user } = useAuthStore(); // Check login status from Zustand

    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!user) {
            alert("Please login to add products to cart");
            return;
        }

        try {
            // Axios automatically uses the base URL and attaches the cookie
            await api.post("/cart", { productId: product.id });
            alert("Product added to cart");
        } catch (error) {
            console.log("Add to cart error:", error);
            alert(error.response?.data?.message || "Failed to add product");
        }
    };

    return (
        <div className="product-card" onClick={handleProductClick}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <div className="product-card-buttons">
                <button onClick={handleProductClick}>View Product</button>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;