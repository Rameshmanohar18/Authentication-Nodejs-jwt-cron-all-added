import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
 const token=req.headers.authorization?.split(" ")[1];
 console.log("🍋 token", token);
 
 if(!token) return res.status(401).json({msg:"No Token"});

 req.user=jwt.verify(token,process.env.JWT_SECRET);
 next();
};

export default authMiddleware;
