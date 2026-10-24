// import React, { useEffect, useState } from "react";
// import "./OrdersPage.css";
// import { useNavigate } from "react-router-dom";

// function OrdersPage() {

//     const navigate=useNavigate();

//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         const fetchOrders = async () => {

//             const token = localStorage.getItem("token");

//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             try {

//                 const response = await fetch(
//                     "http://localhost:3000/api/orders",
//                     {
//                         headers: {
//                             "Authorization": `Bearer ${token}`
//                         }
//                     }
//                 );

//                 const data = await response.json();

//                 if (response.ok) {
//                     setOrders(data);
//                 } else {
//                     console.log(data.message);
//                 }

//             } catch (error) {

//                 console.log("Orders error:", error);

//             } finally {

//                 setLoading(false);

//             }
//         };

//         fetchOrders();

//     }, []);

//     if (loading) {
//         return <div>Loading orders...</div>;
//     }

//     if (orders.length === 0) {
//         return (
//             <div className="orders-page">
//                 <h1>My Orders</h1>
//                 <p>You have no orders yet.</p>
//                 <button onClick={() => navigate("/")}>
//                     Continue Shopping
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="orders-page">

//             <h1>My Orders</h1>

//             <div className="orders-container">

//                 {orders.map((order) => (

//                     <div
//                         className="order-card"
//                         key={order.id}
//                     >

//                         <h3>
//                             Order #{order.id}
//                         </h3>

//                         <p>
//                             Total: ₹{Number(order.total_amount).toFixed(2)}
//                         </p>

//                         <p>
//                             Status: {order.status}
//                         </p>

//                         <p>
//                             Date:{" "}
//                             {new Date(
//                                 order.created_at
//                             ).toLocaleDateString()}
//                         </p>

//                     </div>

//                 ))}

//             </div>
//             <button onClick={() => navigate("/")} className="second-button">
//                 Continue Shopping
//             </button>

//         </div>
//     );
// }

// export default OrdersPage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import "./OrdersPage.css";

// function OrdersPage() {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!user) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // Axios automatically handles the headers and parses the JSON
//                 const response = await api.get("/orders");
//                 setOrders(response.data);
//             } catch (error) {
//                 console.log("Orders error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user]); // Add user to dependency array

//     if (loading) {
//         return <div>Loading orders...</div>;
//     }

//     if (orders.length === 0) {
//         return (
//             <div className="orders-page">
//                 <h1>My Orders</h1>
//                 <p className="para">You have no orders yet.</p>
//                 <button className="new-button" onClick={() => navigate("/")}>Continue Shopping</button>
//             </div>
//         );
//     }

//     return (
//         <div className="orders-page">
//             <h1>My Orders</h1>
            
//             <div className="orders-container">
//                 {orders.map((order) => (
//                     <div className="order-card" key={order.id}>
                        
//                         {/* 1. Order Header (ID, Date, Status) */}
//                         <div className="order-header">
//                             <div>
//                                 <h3>Order #{order.id}</h3>
//                                 <p className="order-date">
//                                     Placed on: {new Date(order.created_at).toLocaleDateString()}
//                                 </p>
//                             </div>
//                             <div className="order-status">
//                                 <span>Status: </span>
//                                 <strong>{order.status}</strong>
//                             </div>
//                         </div>

//                         {/* 2. Nested loop: Show every product in this specific order */}
//                         <div className="order-items-list">
//                             {order.items && order.items.map((item, index) => (
//                                 <div className="order-product" key={index}>
//                                     <img src={item.image} alt={item.name} />
//                                     <div className="order-product-details">
//                                         <h4>{item.name}</h4>
//                                         <p>Qty: {item.quantity}</p>
//                                         <p>₹{item.price}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* 3. Order Footer (Total Amount) */}
//                         <div className="order-footer">
//                             <h3>Total: ₹{Number(order.total_amount).toFixed(2)}</h3>
//                         </div>

//                     </div>
//                 ))}
//             </div>

//             <button className="second-button" style={{ margin: "20px auto", display: "block" }} onClick={() => navigate("/")}>
//                 Continue Shopping
//             </button>
//         </div>
//     );
// }

// export default OrdersPage;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { useAuthStore } from "../store/authStore";
// import "./OrdersPage.css";

// function OrdersPage() {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!user) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await api.get("/orders");
//                 setOrders(response.data);
//             } catch (error) {
//                 console.log("Orders error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user]);

//     if (loading) {
//         return <div>Loading orders...</div>;
//     }

//     if (orders.length === 0) {
//         return (
//             <div className="orders-page">
//                 <h1>My Orders</h1>
//                 <p className="para">You have no orders yet.</p>
//                 <button className="new-button" onClick={() => navigate("/")}>Continue Shopping</button>
//             </div>
//         );
//     }

//     return (
//         <div className="orders-page">
//             <h1>My Orders</h1>
            
//             <div className="orders-container">
//                 {orders.map((order) => (
//                     <div className="order-card" key={order.id}>
                        
//                         <div className="order-header">
//                             <div>
//                                 <h3>Order #{order.id}</h3>
//                                 <p className="order-date">
//                                     Placed on: {new Date(order.created_at).toLocaleDateString()}
//                                 </p>
//                             </div>
//                             <div className="order-status">
//                                 <span>Status: </span>
//                                 <strong>{order.status}</strong>
//                             </div>
//                         </div>

//                         <div className="order-items-list">
//                             {order.items && order.items.map((item, index) => (
//                                 <div className="order-product" key={index}>
//                                     <img src={item.image} alt={item.name} />
//                                     <div className="order-product-details">
//                                         <h4>{item.name}</h4>
//                                         {/* Explicit Math Breakdown */}
//                                         <p className="price-math">
//                                             ₹{Number(item.price).toFixed(2)} &times; {item.quantity} = <strong>₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="order-footer">
//                             <h3>Total: ₹{Number(order.total_amount).toFixed(2)}</h3>
//                         </div>

//                     </div>
//                 ))}
//             </div>

//             <button className="second-button" style={{ margin: "20px auto", display: "block" }} onClick={() => navigate("/")}>
//                 Continue Shopping
//             </button>
//         </div>
//     );
// }

// export default OrdersPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import "./OrdersPage.css";

function OrdersPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    
    // Page loader state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get("/orders");
                setOrders(response.data);
            } catch (error) {
                console.log("Orders error:", error);
            } finally {
                setLoading(false); // Stop spinner once loaded
            }
        };

        fetchOrders();
    }, [user]);

    // Render full-page spinner while fetching data
    if (loading) {
        return (
            <div className="page-loader">
                <div className="spinner"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p className="para">You have no orders yet.</p>
                <button className="new-button" onClick={() => navigate("/")}>Continue Shopping</button>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>My Orders</h1>
            
            <div className="orders-container">
                {orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        
                        <div className="order-header">
                            <div>
                                <h3>Order #{order.id}</h3>
                                <p className="order-date">
                                    Placed on: {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="order-status">
                                <span>Status: </span>
                                <strong>{order.status}</strong>
                            </div>
                        </div>

                        <div className="order-items-list">
                            {order.items && order.items.map((item, index) => (
                                <div className="order-product" key={index}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="order-product-details">
                                        <h4>{item.name}</h4>
                                        {/* Explicit Math Breakdown */}
                                        <p className="price-math">
                                            ₹{Number(item.price).toFixed(2)} &times; {item.quantity} = <strong>₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <h3>Total: ₹{Number(order.total_amount).toFixed(2)}</h3>
                        </div>

                    </div>
                ))}
            </div>

            <button className="second-button" style={{ margin: "20px auto", display: "block" }} onClick={() => navigate("/")}>
                Continue Shopping
            </button>
        </div>
    );
}

export default OrdersPage;