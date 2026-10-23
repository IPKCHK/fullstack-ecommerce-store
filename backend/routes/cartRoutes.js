import express from "express";
import { sql } from "../config/db.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET CART
router.get("/", authenticate, async (req, res) => {
    try {

        const userId = req.user.id;

        const cart = await sql`
            SELECT id
            FROM carts
            WHERE user_id = ${userId}
        `;

        if (cart.length === 0) {
            return res.status(200).json({
                cart: null,
                items: []
            });
        }

        const cartId = cart[0].id;

        const items = await sql`
            SELECT
                cart_items.id,
                cart_items.product_id,
                cart_items.quantity,
                products.name,
                products.image,
                products.price
            FROM cart_items
            JOIN products
                ON cart_items.product_id = products.id
            WHERE cart_items.cart_id = ${cartId}
        `;

        res.status(200).json({
            cart: cart[0],
            items
        });

    } catch (error) {

        console.log("Get cart error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// ADD TO CART
router.post("/", authenticate, async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;

        // Check whether cart exists
        let cart = await sql`
            SELECT id
            FROM carts
            WHERE user_id = ${userId}
        `;

        // Create cart if it doesn't exist
        if (cart.length === 0) {

            cart = await sql`
                INSERT INTO carts (user_id)
                VALUES (${userId})
                RETURNING id
            `;
        }

        const cartId = cart[0].id;

        // Check whether product is already in cart
        const existingItem = await sql`
            SELECT id, quantity
            FROM cart_items
            WHERE cart_id = ${cartId}
            AND product_id = ${productId}
        `;

        if (existingItem.length > 0) {

            const updatedItem = await sql`
                UPDATE cart_items
                SET quantity = quantity + 1
                WHERE id = ${existingItem[0].id}
                RETURNING *
            `;

            return res.status(200).json({
                message: "Product quantity increased",
                item: updatedItem[0]
            });
        }

        // Add new product
        const newItem = await sql`
            INSERT INTO cart_items (
                cart_id,
                product_id,
                quantity
            )
            VALUES (
                ${cartId},
                ${productId},
                1
            )
            RETURNING *
        `;

        res.status(201).json({
            message: "Product added to cart",
            item: newItem[0]
        });

    } catch (error) {

        console.log("Add to cart error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// UPDATE QUANTITY
router.put("/:productId", authenticate, async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const result = await sql`
            UPDATE cart_items
            SET quantity = ${quantity}
            WHERE product_id = ${productId}
            AND cart_id = (
                SELECT id
                FROM carts
                WHERE user_id = ${userId}
            )
            RETURNING *
        `;

        if (result.length === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Quantity updated",
            item: result[0]
        });

    } catch (error) {

        console.log("Update cart error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


// REMOVE FROM CART
router.delete("/:productId", authenticate, async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.params;

        const result = await sql`
            DELETE FROM cart_items
            WHERE product_id = ${productId}
            AND cart_id = (
                SELECT id
                FROM carts
                WHERE user_id = ${userId}
            )
            RETURNING *
        `;

        if (result.length === 0) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            message: "Product removed from cart"
        });

    } catch (error) {

        console.log("Remove cart item error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default router;