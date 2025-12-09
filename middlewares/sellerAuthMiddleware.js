import sellerDTO from '../schemas/sellerSchema/sellerInfo.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isSellerAlreadyRegistered = async (req, res) => {
  const data = req.body;
  console.log(data);
  const checks = [
    { field: 'email', message: 'Email already registered' },
    { field: 'phone', message: 'Phone already registered' },
    { field: 'businessName', message: 'Business Name already registered' },
    { field: 'gstNumber', message: 'GST Number already registered' },
    { field: 'panNumber', message: 'PAN Number already registered' },
    { field: 'pickupAddress', message: 'Pickup Address already registered' },
    { field: 'accountHolder', message: 'Account Holder Name already registered' },
    { field: 'accountNumber', message: 'Account Number already registered' },
  ];

  for (const check of checks) {
    const query = {};
    query[check.field] = data[check.field];

    const existing = await sellerDTO.findOne(query);
    if (existing) {
      return res.status(409).json({ message: check.message });
    }
  }


  return res.status(200).json({ message: 'No duplicates found. Proceed.' });
};

const isTokenUser = (req, res, next) => {

  try {

    // getting bearer token from headers
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader != 'undefined') {
      const token = bearerHeader.split(" ")[1];

      console.log(token, "---------token");
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);


      req.token = user;

      next();
    }
    else {
      res.status(401).json({ message: "User Unauthorized" });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });

  }


}

// authController.js
export const isTokenUserWithCookie = async (req, res, next) => {

  try {
    const token = req.cookies.sellerToken;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!req.query.sellerId) {
      req.seller = {
        sellerId: decoded.sellerId,
      };
      // console.log("auth mai aaye",decoded.sellerId)
    }

    // Security check if both query param and token exist
    // if (req.query.sellerId !== decoded.sellerId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Unauthorized access'
    //   });
    // }

    next();

  } catch (error) {
    res.clearCookie('sellerToken');

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please login again.'
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const checkAuthStatus  = async (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;

    // 401 Unauthorized if no token
    if (!token) {
      return res.status(401).json({
        isAuthenticated: false,
        message: 'No authentication token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 200 OK for successful authentication
    return res.status(200).json({
      isAuthenticated: true,
      sellerId: decoded.sellerId,
    });

  } catch (error) {
    // Clear invalid/expired token
    res.clearCookie('sellerToken');

    // Different status codes based on error type
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        isAuthenticated: false,
        message: 'Token expired'
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        isAuthenticated: false,
        message: 'Invalid token'
      });
    }

    // 500 for other unexpected errors
    return res.status(500).json({
      isAuthenticated: false,
      message: 'Internal server error during authentication'
    });
  }
};

// In your authController.js
const logout = (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: false, // सीधे false सेट करें
      sameSite: 'strict'
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

const sellerAuths = { isSellerAlreadyRegistered, isTokenUser, isTokenUserWithCookie, checkAuthStatus , logout };
export default sellerAuths;
