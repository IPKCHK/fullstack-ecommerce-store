import jwt from "jsonwebtoken";

// export const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({
//             error: "Authentication required"
//         });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         next();

//     } catch (error) {
//         return res.status(401).json({
//             error: "Invalid or expired token"
//         });
//     }
// };

export const authenticate = (req, res, next) => {
    // Look for the token in the cookies automatically parsed by cookie-parser
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export const requireAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            error: "Admin access required"
        });
    }

    next();
};