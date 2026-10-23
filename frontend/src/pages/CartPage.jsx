// import React, { useEffect, useState } from "react";
// import "./CartPage.css";

// function CartPage() {

//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchCart = async () => {

//         const token = localStorage.getItem("token");

//         if (!token) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const API_URL = import.meta.env.VITE_API_URL
//             const response = await fetch(
//                 `${API_URL}/cart`,
//                 {
//                     headers: {
//                         "Authorization": `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setItems(data.items);
//             }

//         } catch (error) {

//             console.log("Cart error:", error);

//         } finally {

//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     const handleRemove = async (productId) => {

//         const token = localStorage.getItem("token");

//         try {
//             const API_URL = import.meta.env.VITE_API_URL
//             const response = await fetch(
//                 `${API_URL}/cart/${productId}`,
//                 {
//                     method: "DELETE",
//                     headers: {
//                         "Authorization": `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {
//                 setItems(
//                     items.filter(
//                         (item) => item.product_id !== productId
//                     )
//                 );
//             } else {
//                 alert(data.message || "Failed to remove product");
//             }

//         } catch (error) {

//             console.log("Remove cart error:", error);

//         }
//     };

//     const handleQuantityChange = async (productId, newQuantity) => {

//         const token = localStorage.getItem("token");

//         if (newQuantity < 1) {
//             return;
//         }

//         try {
//             const API_URL = import.meta.env.VITE_API_URL
//             const response = await fetch(
//                 `${API_URL}/cart/${productId}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         quantity: newQuantity
//                     })
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {

//                 setItems(
//                     items.map((item) =>
//                         item.product_id === productId
//                             ? { ...item, quantity: newQuantity }
//                             : item
//                     )
//                 );

//             } else {
//                 alert(data.message || "Failed to update quantity");
//             }

//         } catch (error) {

//             console.log("Quantity update error:", error);

//         }
//     };

//     const handleCheckout = async () => {

//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("Please login first");
//             return;
//         }

//         try {
//             const API_URL = import.meta.env.VITE_API_URL
//             const response = await fetch(
//                 `${API_URL}/orders`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Authorization": `Bearer ${token}`
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (response.ok) {

//                 alert("Order placed successfully!");

//                 setItems([]);

//             } else {

//                 alert(data.message || "Failed to place order");

//             }

//         } catch (error) {

//             console.log("Checkout error:", error);

//         }
//     };

//     if (loading) {
//         return <div>Loading cart...</div>;
//     }

//     if (items.length === 0) {
//         return (
//             <div className="cart-page">
//                 <h1>Your Cart</h1>
//                 <p>Your cart is empty.</p>
//             </div>
//         );
//     }

//     const total = items.reduce(
//         (sum, item) => sum + Number(item.price) * item.quantity,
//         0
//     );

//     return (
//         <div className="cart-page">

//             <h1>Your Cart</h1>

//             <div className="cart-items">

//                 {items.map((item) => (

//                     <div
//                         className="cart-item"
//                         key={item.id}
//                     >

//                         <img
//                             src={item.image}
//                             alt={item.name}
//                         />

//                         <div>
//                             <h3>{item.name}</h3>

//                             <p>
//                                 ₹{item.price}
//                             </p>

//                             <div className="quantity-controls">

//                                 <button
//                                     onClick={() =>
//                                         handleQuantityChange(
//                                             item.product_id,
//                                             item.quantity - 1
//                                         )
//                                     }
//                                 >
//                                     -
//                                 </button>

//                                 <span>{item.quantity}</span>

//                                 <button
//                                     onClick={() =>
//                                         handleQuantityChange(
//                                             item.product_id,
//                                             item.quantity + 1
//                                         )
//                                     }
//                                 >
//                                     +
//                                 </button>

//                             </div>

//                             <button
//                                 onClick={() => handleRemove(item.product_id)}
//                             >
//                                 Remove
//                             </button>
//                         </div>

//                     </div>

//                 ))}

//             </div>

//             <div className="cart-total">

//                 <h2>
//                     Total: ₹{total.toFixed(2)}
//                 </h2>

//             <button onClick={handleCheckout} className="checkout-button">
//                 Checkout
//             </button>

//             </div>

//         </div>
//     );
// }

// export default CartPage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import "./CartPage.css";

// function CartPage() {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
    
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchCart = async () => {
//         if (!user) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await api.get("/cart");
//             // CRITICAL FIX: Access the .items array inside the response data
//             setItems(response.data.items || []);
//         } catch (error) {
//             console.log("Cart error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCart();
//     }, [user]);

//     const handleRemove = async (productId) => {
//         try {
//             await api.delete(`/cart/${productId}`);
//             setItems(items.filter((item) => item.product_id !== productId));
//         } catch (error) {
//             console.log("Remove cart error:", error);
//             alert(error.response?.data?.message || "Failed to remove product");
//         }
//     };

//     const handleQuantityChange = async (productId, newQuantity) => {
//         if (newQuantity < 1) return;

//         try {
//             await api.put(`/cart/${productId}`, { quantity: newQuantity });
            
//             setItems(
//                 items.map((item) =>
//                     item.product_id === productId
//                         ? { ...item, quantity: newQuantity }
//                         : item
//                 )
//             );
//         } catch (error) {
//             console.log("Quantity update error:", error);
//             alert(error.response?.data?.message || "Failed to update quantity");
//         }
//     };

//     const handleCheckout = async () => {
//         if (!user) {
//             alert("Please login first");
//             return;
//         }

//         try {
//             await api.post("/orders");
//             alert("Order placed successfully!");
//             setItems([]);
//         } catch (error) {
//             console.log("Checkout error:", error);
//             alert(error.response?.data?.message || "Failed to place order");
//         }
//     };

//     if (loading) {
//         return <div>Loading cart...</div>;
//     }

//     if (items.length === 0) {
//         return (
//             <div className="cart-page" style={{ textAlign: "center", padding: "50px 0" }}>
//                 <h1>Your Cart</h1>
//                 <p>Your cart is empty.</p>
//                 <button 
//                     className="second-button" 
//                     style={{ margin: "20px auto", display: "block" }} 
//                     onClick={() => navigate("/")}
//                 >
//                     Continue Shopping
//                 </button>
//             </div>
//         );
//     }

//     const total = items.reduce(
//         (sum, item) => sum + Number(item.price) * item.quantity,
//         0
//     );

//     return (
//         <div className="cart-page">
//             <h1>Your Cart</h1>

//             <div className="cart-items">
//                 {items.map((item) => (
//                     <div className="cart-item" key={item.id}>
//                         <img src={item.image} alt={item.name} />

//                         <div>
//                             <h3>{item.name}</h3>
//                             <p>₹{item.price}</p>

//                             <div className="quantity-controls">
//                                 <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}>
//                                     -
//                                 </button>
//                                 <span>{item.quantity}</span>
//                                 <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}>
//                                     +
//                                 </button>
//                             </div>

//                             <button onClick={() => handleRemove(item.product_id)}>
//                                 Remove
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="cart-total">
//                 <h2>Total: ₹{total.toFixed(2)}</h2>
//                 <button onClick={handleCheckout} className="checkout-button">
//                     Checkout
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default CartPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import "./CartPage.css";

function CartPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/cart");
            setItems(response.data.items || []);
        } catch (error) {
            console.log("Cart error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/${productId}`);
            setItems(items.filter((item) => item.product_id !== productId));
        } catch (error) {
            console.log("Remove cart error:", error);
            alert(error.response?.data?.message || "Failed to remove product");
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await api.put(`/cart/${productId}`, { quantity: newQuantity });
            
            setItems(
                items.map((item) =>
                    item.product_id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.log("Quantity update error:", error);
            alert(error.response?.data?.message || "Failed to update quantity");
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            await api.post("/orders");
            alert("Order placed successfully!");
            setItems([]);
        } catch (error) {
            console.log("Checkout error:", error);
            alert(error.response?.data?.message || "Failed to place order");
        }
    };

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (items.length === 0) {
        return (
            <div className="cart-page" style={{ textAlign: "center", padding: "50px 0" }}>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
                <button 
                    className="second-button" 
                    style={{ margin: "20px auto", display: "block" }} 
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    // Dynamic Math Calculations
    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    const shippingFee = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
    const finalTotal = subtotal + shippingFee;

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            <div className="cart-items">
                {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />

                        <div>
                            <h3>{item.name}</h3>
                            
                            {/* Explicit Math Breakdown */}
                            <p style={{ color: "#aaaaaa", marginBottom: "10px", fontSize: "0.95rem" }}>
                                ₹{Number(item.price).toFixed(2)} &times; {item.quantity} = 
                                <strong style={{ color: "#ffffff", fontSize: "1.1rem", marginLeft: "5px" }}>
                                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                </strong>
                            </p>

                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}>
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}>
                                    +
                                </button>
                            </div>

                            <button onClick={() => handleRemove(item.product_id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Order Summary Box */}
            <div className="order-summary-box">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                    <span>Subtotal ({items.length} items):</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                    <span>Shipping:</span>
                    <span>{shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}</span>
                </div>
                
                <hr className="summary-divider" />
                
                <div className="summary-row final-total">
                    <strong>Total:</strong>
                    <strong>₹{finalTotal.toFixed(2)}</strong>
                </div>

                <button onClick={handleCheckout} className="checkout-button">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPage;