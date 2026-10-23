import express from "express"
import bcrypt from "bcrypt"
import {sql} from "../config/db.js"
import jwt from "jsonwebtoken"

const router=express.Router();

router.post("/signup",async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        if(password.length < 6) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});
        }

        const existingUser=await sql`
            SELECT id from users
            WHERE email=${email}
        `;
        if(existingUser.length>0)
        {
            return res.status(400).json({success:false,message:"Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser=await sql`
            INSERT INTO users (name,email,password)
            VALUES (${name},${email},${hashedPassword})
            RETURNING id,name,email,created_at
        `
        res.status(201).json({
            success: true,
            message: "Signup successful",
            user: newUser[0]
        });

    } catch (error) {
        console.log("Signup error",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
});

router.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;
        const users=await sql`
            SELECT * FROM users
            where email=${email}
        `;
        if(users.length==0)
        {
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }

        const user=users[0];

        const isPasswordCorrect=await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect)
        {
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }
        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // res.status(200).json({
        //     message: "Login successful",

        //     token,

        //     user: {
        //         id: user.id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role
        //     }
        // });

        res.cookie("token", token, {
            httpOnly: true, // Hides it from frontend JavaScript
            secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
            // Notice: token is no longer in the JSON body
        });


    } catch (error) {
        console.log("Login error:",error);

        res.status(500).json({
            message:"Internal server error"
        });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;