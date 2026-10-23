// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ProductPage.css"

// function ProductPage() {

//     const { id } = useParams();

//     const [product, setProduct] = useState(null);

//     useEffect(() => {

//         const fetchProduct = async () => {
//             try {
//                 const API_URL = import.meta.env.VITE_API_URL
//                 const response = await fetch(
//                     `${API_URL}/products/${id}`
//                 );

//                 const data = await response.json();

//                 if (response.ok) {
//                     setProduct(data);
//                 } else {
//                     console.log(data.error);
//                 }

//             } catch (error) {
//                 console.log("Error fetching product:", error);
//             }
//         };

//         fetchProduct();

//     }, [id]);

//     const handleAddToCart = async (e) => {
//         e.stopPropagation();

//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Please login to add products to cart");
//             return;
//         }

//         try {
//             const API_URL = import.meta.env.VITE_API_URL
//             const response = await fetch(
//                 "${API_URL}/cart",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         productId: product.id
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 alert("Product added to cart");
//             } else {
//                 alert(data.message || "Failed to add product");
//             }

//         } catch (error) {
//             console.log("Add to cart error:", error);
//         }
//     };

//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="product-page">

//             <img
//                 src={product.image}
//                 alt={product.name}
//             />

//             <div>
//                 <h1>{product.name}</h1>

//                 <p>₹{product.price}</p>

//                 <button onClick={handleAddToCart}>
//                     Add to Cart
//                 </button>
//             </div>

//         </div>
//     );
// }

// export default ProductPage;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import api from "../api/axios"; // Import your Axios instance
import { useAuthStore } from "../store/authStore"; // Import your Zustand store
import "./ProductPage.css";

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    
    // Read the user state from Zustand
    const { user } = useAuthStore(); 

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Axios automatically uses your VITE_API_URL base and parses the JSON
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        // Check if logged in using Zustand
        if (!user) {
            alert("Please login to add products to cart");
            navigate("/login"); // Redirect them to the login page
            return;
        }

        try {
            // Axios automatically attaches your HTTP-Only cookie here
            await api.post("/cart", {
                productId: product.id
            });

            alert("Product added to cart");
        } catch (error) {
            console.log("Add to cart error:", error);
            // Axios stores backend error messages in error.response.data
            alert(error.response?.data?.message || "Failed to add product");
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-page">
            <img
                src={product.image}
                alt={product.name}
            />

            <div>
                <h1>{product.name}</h1>
                <p>₹{product.price}</p>

                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductPage;