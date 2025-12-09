import express from 'express';
import twilio_Auths from '../twilio/auth.js';
import customer_profile_Controller from '../controllers/customerController.js';
import customerAuths from '../middlewares/customerAuthMiddleware.js';

const router = express.Router();

router.post('/sendOTP', twilio_Auths.sendOtp);
router.post('/verifyOTP', twilio_Auths.verifyOtp, customer_profile_Controller.isCustomerNewOrOld);
router.post('/logout', customerAuths.logout);
router.get('/authentication', customerAuths.checkAuthStatus );
router.post('/check-phone-is-registered', customer_profile_Controller.isPhoneRegistered);
router.post('/getInfo', customer_profile_Controller.getCustomerInfo);
router.post('/update-profile', customer_profile_Controller.updateProfile);

export default router;