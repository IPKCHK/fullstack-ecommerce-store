// // import React, { useEffect, useState } from "react";
// // import ProductCard from "../components/ProductCard";

// // function HomePage() {

// //     const [products, setProducts] = useState([]);

// //     useEffect(() => {
// //         const fetchProducts = async () => {
// //             try {
// //                 const API_URL = import.meta.env.VITE_API_URL
// //                 const response = await fetch(
// //                     `${API_URL}/products`
// //                 );

// //                 const data = await response.json();

// //                 if (response.ok) {
// //                     setProducts(data);
// //                 } else {
// //                     console.log(data.error);
// //                 }

// //             } catch (error) {
// //                 console.log("Error fetching products:", error);
// //             }
// //         };

// //         fetchProducts();
// //     }, []);

// //     return (
// //         <div className="home-page">

// //             <h1>Products</h1>

// //             <div className="products-container">
// //                 {products.map((product) => (
// //                     <ProductCard
// //                         key={product.id}
// //                         product={product}
// //                     />
// //                 ))}
// //             </div>

// //         </div>
// //     );
// // }

// // export default HomePage;



// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import api from "../api/axios"; // Import your Axios instance

// function HomePage() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 // Axios automatically uses your base URL + /api and parses the JSON
//                 const response = await api.get("/products");
//                 setProducts(response.data);
//             } catch (error) {
//                 console.log("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div className="home-page">
//             <h1>Products</h1>
//             <div className="products-container">
//                 {products.map((product) => (
//                     <ProductCard
//                         key={product.id}
//                         product={product}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../api/axios"; 

function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 1. Add loading state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.log("Error fetching products:", error);
            } finally {
                setIsLoading(false); // 2. Stop spinner when done
            }
        };

        fetchProducts();
    }, []);

    // 3. Show spinner while fetching
    if (isLoading) {
        return (
            <div className="page-loader">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <h1>Products</h1>
            <div className="products-container">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;