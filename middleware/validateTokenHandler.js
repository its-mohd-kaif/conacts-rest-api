const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  console.log("validateToken", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKENN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log("decoded", decoded);
      req.user = decoded.user;
      next(); 
    });

    if (!token) {
      res.status(401);
      return res.json({ error: "User is not authorized or token is missing" });
    }
    
  }
});

module.exports = validateToken;
