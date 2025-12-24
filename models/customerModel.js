import customerDTO from '../schemas/customerScehma/customerInfo.js';
import jwt from 'jsonwebtoken';

const getCustomer = async (req) => {
    try {

        let customerPhone = req.body.phone;
        let foundCustomer;

        if (customerPhone) {
            foundCustomer = await customerDTO.findOne({ phone: customerPhone });
        }

        if (foundCustomer) {
            return { code: 200, present: true, customerId: foundCustomer.customerId };
        } else {
            console.warn("⚠️ Customer not found for this phone number:", customerPhone);
            return { code: 404, present: false, message: "Customer not found" };
        }
    } catch (err) {
        console.error("❌ Server error in getCustomer:", err.message);
        return { code: 500, present: false, message: "Internal server error" };
    }
};


const registerNewCustomer = async (req) => {
    const data = req.body;
    console.log(data);


    const newcustomer = new customerDTO({

        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        receiveAddress: data.receiveAddress
    });

    const savedCustomer = await newcustomer.save();

    return savedCustomer.customerId;
}


const generateToken = async (req, res) => {  // Note: Added `res` parameter
    const data = req.body;

    try {
        // 🔍 Step 1: Find customer by customerId
        const foundCustomer = await customerDTO.findOne({ phone: data.phone });

        // console.log(foundCustomer, "ye hai customer found ok------------");

        // 🪙 Step 3: Generate JWT token
        const token = jwt.sign(
            {
                customerId: foundCustomer.customerId,
                customerMongoId: foundCustomer._id,
                // customerName: `${foundCustomer.firstName} ${foundCustomer.lastName}`,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );


        // � Step 4: Set HTTP-only cookie 7 days
        res.cookie('customerToken', token, {
            httpOnly: true,      // Prevent XSS attacks
            secure: true,        // HTTPS-only (enable in production)
            sameSite: 'None',  // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,     // 7 days expiry (auto-deletes)
        });

        // ✅ Success response
        return token;

    } catch (error) {
        console.log(error, "--> ye hai error");

        throw new Error(error);
    }
};

const checkPhoneRegisteration = async (req, res) => {

    console.log(req.body.phone);
    
    const found = await customerDTO.findOne({ phone: req.body.phone });

    console.log(found);
    
    return found;
    
}

const customerInfo = async (req) => {
    
    return await customerDTO.findOne({ phone: req.body.phone });

}

const updateProfile = async (req) => {

    const data = req.body;
    const updatedCustomer = await customerDTO.findOneAndUpdate(
        { phone: data.phone },
        {
            $set: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                receiveAddress: data.receiveAddress,
            },
        },
        { new: true }
    );

    
    return updatedCustomer;

}


const customer_profile_Model = { getCustomer, registerNewCustomer, generateToken, checkPhoneRegisteration, customerInfo, updateProfile };
export default customer_profile_Model;
