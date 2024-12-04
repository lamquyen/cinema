import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";
//authenticate user & get token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//protection middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.starstWith("Bearer")
  ) {
    //set token from Bearer token in header
    try {
      token = req.headers.authorization.split(" ")[1];
      //verify token and get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user ID from decoded token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  //if token doesn't exists in header send err
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { generateToken, protect };
