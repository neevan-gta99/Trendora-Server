import customerDTO from '../schemas/customerScehma/customerInfo.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// authController.js
const isTokenUserWithCookie = async (req, res, next) => {

  try {
    const token = req.cookies.customerToken;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!req.query.customerId) {
      req.customer = {
        customerId: decoded.customerId,
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
    res.clearCookie('customerToken');

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

const checkAuthStatus  = async (req, res, next) => {
  try {
    const token = req.cookies.customerToken;

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
      customerId: decoded.customerId,
    });

  } catch (error) {
    // Clear invalid/expired token
    res.clearCookie('customerToken');

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
    res.clearCookie('customerToken', {
      httpOnly: true,
      secure: false, // सीधे false सेट करें
      sameSite: 'strict'
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

const customerAuths = { isTokenUserWithCookie, checkAuthStatus , logout };
export default customerAuths;
