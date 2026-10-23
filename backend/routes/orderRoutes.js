import express from "express";
import { sql } from "../config/db.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();


// PLACE ORDER
router.post("/", authenticate, async (req, res) => {
    try {

        const userId = req.user.id;

        // Find user's cart
        const cart = await sql`
            SELECT id
            FROM carts
            WHERE user_id = ${userId}
        `;

        if (cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const cartId = cart[0].id;

        // Get cart items
        const items = await sql`
            SELECT
                cart_items.product_id,
                cart_items.quantity,
                products.name,
                products.price
            FROM cart_items
            JOIN products
                ON cart_items.product_id = products.id
            WHERE cart_items.cart_id = ${cartId}
        `;

        if (items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Calculate total safely
        const rawTotal = items.reduce(
            (sum, item) => sum + Number(item.price) * item.quantity,
            0
        );
        
        // ADD THIS: Rounds to exactly 2 decimal places (e.g. 19.99 instead of 19.99000001)
        const totalAmount = Math.round(rawTotal * 100) / 100;

        // // Calculate total
        // const totalAmount = items.reduce(
        //     (sum, item) =>
        //         sum + Number(item.price) * item.quantity,
        //     0
        // );

        // Create order
        const newOrder = await sql`
            INSERT INTO orders (
                user_id,
                total_amount
            )
            VALUES (
                ${userId},
                ${totalAmount}
            )
            RETURNING *
        `;

        const order = newOrder[0];

        // Add items to order
        for (const item of items) {

            await sql`
                INSERT INTO order_items (
                    order_id,
                    product_id,
                    product_name,
                    price,
                    quantity
                )
                VALUES (
                    ${order.id},
                    ${item.product_id},
                    ${item.name},
                    ${item.price},
                    ${item.quantity}
                )
            `;
        }

        // Clear cart
        await sql`
            DELETE FROM cart_items
            WHERE cart_id = ${cartId}
        `;

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.log("Place order error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// // GET MY ORDERS
// router.get("/", authenticate, async (req, res) => {
//     try {

//         const userId = req.user.id;

//         const orders = await sql`
//             SELECT *
//             FROM orders
//             WHERE user_id = ${userId}
//             ORDER BY created_at DESC
//         `;

//         res.status(200).json(orders);

//     } catch (error) {

//         console.log("Get orders error:", error);

//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// });

// GET MY ORDERS
router.get("/", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Fetch all basic orders for this user
        const orders = await sql`
            SELECT *
            FROM orders
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        // 2. Loop through each order to fetch its products
        for (let order of orders) {
            
            // We use a JOIN here to grab the image directly from the products table
            const items = await sql`
                SELECT 
                    oi.quantity,
                    oi.price,
                    p.name,
                    p.image
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE oi.order_id = ${order.id}
            `;
            
            // 3. Attach the found items to this specific order object
            order.items = items;
        }

        // Now the backend sends the exact nested structure your frontend expects!
        res.status(200).json(orders);

    } catch (error) {
        console.log("Get orders error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// // GET SINGLE ORDER
// router.get("/:id", authenticate, async (req, res) => {
//     try {

//         const userId = req.user.id;
//         const { id } = req.params;

//         const orders = await sql`
//             SELECT *
//             FROM orders
//             WHERE id = ${id}
//             AND user_id = ${userId}
//         `;

//         if (orders.length === 0) {
//             return res.status(404).json({
//                 message: "Order not found"
//             });
//         }

//         const items = await sql`
//             SELECT *
//             FROM order_items
//             WHERE order_id = ${id}
//         `;

//         res.status(200).json({
//             order: orders[0],
//             items
//         });

//     } catch (error) {

//         console.log("Get order error:", error);

//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// });

// GET SINGLE ORDER
router.get("/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const orders = await sql`
            SELECT *
            FROM orders
            WHERE id = ${id}
            AND user_id = ${userId}
        `;

        if (orders.length === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // 1. Add the exact same JOIN here to get the product images
        const items = await sql`
            SELECT 
                oi.quantity,
                oi.price,
                p.name,
                p.image
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ${id}
        `;

        // 2. Attach the rich items directly into the order object (matching your other route)
        const order = orders[0];
        order.items = items;

        res.status(200).json(order);

    } catch (error) {
        console.log("Get order error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


export default router;