import seller_Login_Model from '../models/sellerLoginModel.js'

export const sellerLogin = async (req, res) => {


   const authRes = await seller_Login_Model.checkCred(req,res);

   // res.status(authRes.code).json({message: authRes.message,userData: authRes.userData});
   res.status(authRes.code).json({message: authRes.message,token: authRes.jwt_token, sellerId: authRes.sellerId});

   // console.log(authRes.code,authRes.message,authRes.jwt_token);

};