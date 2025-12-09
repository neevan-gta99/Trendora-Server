import sellerDTO from '../schemas/sellerSchema/sellerInfo.js';

const getSeller = async (req) => {
  try {
    
    // console.log("aayi call");
    
    let sellerId = req.query?.sellerId || req.seller?.sellerId;
    let foundSeller;

    if (sellerId) {
      foundSeller = await sellerDTO.findOne({ sellerId });
    }

    if (foundSeller) {
      // console.log("✅ Seller found:", foundSeller.fullName);
      return { code: 200, message: foundSeller };
    } else {
      console.warn("⚠️ Seller not found for ID:", sellerId);
      return { code: 404, message: "Seller not found" };
    }
  } catch (err) {
    console.error("❌ Server error in getSeller:", err.message);
    return { code: 500, message: "Internal server error" };
  }
};


const seller_profile_Model = { getSeller };
export default seller_profile_Model;
