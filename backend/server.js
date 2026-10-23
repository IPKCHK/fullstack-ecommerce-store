import express from "express"
import helmet from "helmet"
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productsRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;
const frontendURL = process.env.FRONTEND_URL

app.use(cors({
    origin: frontendURL,
    credentials: true
}));
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use(helmet());//helmet is security middleware that helps you protect  your app by setting  various http headers

app.use(morgan("dev"));//log the requests

//apply  arcjet limit rate to all routes

app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1//specifies that each token consumes 1 token
        })

        if(decision.isDenied())
        {
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too many requests"});
            }
            else if(decision.reason.isBot())
            {
                res.status(403).json({error:"Bot access denied"});
            }
            else{
                res.status(403).json({error:"Forbidden"});
            }
            return 
        }
        if(decision.results.some((result)=>result.reason.isBot()&&result.reason.isSpoofed()))
        {
            res.status(403).json({error:"Spoofed bot detected"});
            return;
        }
        next();
    } catch (error) {
        console.log("Arcjet error",error);
        next(error);
    }
})

app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

async function initDB(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL (10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) 
        `;
        await sql`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        await sql`
            CREATE TABLE IF NOT EXISTS carts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER UNIQUE NOT NULL
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS cart_items (
                id SERIAL PRIMARY KEY,
                cart_id INTEGER NOT NULL
                    REFERENCES carts(id)
                    ON DELETE CASCADE,
                product_id INTEGER NOT NULL
                    REFERENCES products(id)
                    ON DELETE CASCADE,
                quantity INTEGER NOT NULL DEFAULT 1,
                UNIQUE(cart_id, product_id)
            )
        `;
        await sql`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                total_amount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(30) NOT NULL DEFAULT 'placed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER NOT NULL
                    REFERENCES orders(id)
                    ON DELETE CASCADE,
                product_id INTEGER NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                quantity INTEGER NOT NULL
            )
        `;
        
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initDB",error);
    }
}

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server listening on port "+PORT);
    })
})