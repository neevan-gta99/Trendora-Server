import customer_profile_Model from '../models/customerModel.js'

const isCustomerNewOrOld = async (req, res) => {    

    const isCustomer = await customer_profile_Model.getCustomer(req);
    let customerID;


    if (!isCustomer.present) {
        
        customerID = await customer_profile_Model.registerNewCustomer(req);
    }
    else {        
        customerID = isCustomer.customerId;
    }
    
    try {
        const jwt_Token = await customer_profile_Model.generateToken(req,res);
        res.status(200).json({ message: customerID, token: jwt_Token });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error -> ", error });  // Updated response
    }

    // res.status(200).json({ message: "OK" });

};

const isPhoneRegistered = async (req, res) =>{

    try{
        const foundCustomer = await customer_profile_Model.checkPhoneRegisteration(req); 

        if(!foundCustomer){
            console.log("Nahi mila");
            
         return res.status(404).json({ message: "customer not found "});   
        }

        return res.status(200).json({ message: foundCustomer});  
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error -> ", err });  // Updated response
    }
   
}

const getCustomerInfo = async(req,res) =>{

    try{

        const foundCustomer = await customer_profile_Model.customerInfo(req); 
        return res.status(200).json({ customerData: foundCustomer});  

    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error -> ", err });  // Updated response
    }


}

const updateProfile = async(req,res) => {

    try{

        const updatedCustomer = await customer_profile_Model.updateProfile(req); 
        return res.status(200).json({ customerData: updatedCustomer});  

    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error -> ", err });  // Updated response
    }


}

const customer_profile_Controller = {isCustomerNewOrOld, isPhoneRegistered, getCustomerInfo, updateProfile}
export default customer_profile_Controller;