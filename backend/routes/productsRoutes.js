import express from "express";
import { sql } from "../config/db.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

        res.status(200).json(products);

    } catch (error) {
        console.log("Error getting products:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});


// Add product - ADMIN ONLY
router.post("/", authenticate, requireAdmin, async (req, res) => {
    try {
        const { name, image, price } = req.body;

        const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct[0]
        });

    } catch (error) {
        console.log("Error adding product:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const products = await sql`
            SELECT * FROM products
            WHERE id = ${id}
        `;

        if (products.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.status(200).json(products[0]);

    } catch (error) {
        console.log("Error getting product:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});


export default router;