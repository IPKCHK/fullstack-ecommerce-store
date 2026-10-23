import React, { useState } from "react";
import "./AddProduct.css";
import api from "../../api/axios";

function AddProduct() {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

    //     try {
    //         const API_URL = import.meta.env.VITE_API_URL
    //         const response = await fetch(
    //             "${API_URL}/products",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify({
    //                     name,
    //                     image,
    //                     price
    //                 })
    //             }
    //         );

    //         const data = await response.json();

    //         console.log(data);

    //         if (response.ok) {
    //             alert("Product added successfully!");

    //             setName("");
    //             setImage("");
    //             setPrice("");
    //         } else {
    //             alert(data.error || data.message);
    //         }

    //     } catch (error) {
    //         console.log("Add product error:", error);
    //     }
    // };
    try {
            await api.post("/products", { name, image, price });

            alert("Product added successfully!");
            setName("");
            setImage("");
            setPrice("");

    } catch (error) {
            console.log("Add product error:", error);
            
            if (error.response) {
                // The server rejected it (e.g., missing fields, not an admin)
                alert(error.response.data.error || error.response.data.message || "Failed to add product");
            } else {
                // Network error / backend down
                alert("Could not connect to server");
            }
        }
    }
    return (
        <div className="add-product-page">

            <div className="add-product-box">

                <h2>Add Product</h2>

                <form onSubmit={handleAddProduct}>

                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>

                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>

                        <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>

                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="add-product-btn">
                        Add Product
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddProduct;