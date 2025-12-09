import bcrypt from 'bcrypt';
import sellerDTO from '../schemas/sellerSchema/sellerInfo.js';

const registerNewSeller = async (req, res) => {
  const data = req.body;
  console.log(data);

  // 🔐 Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // 🧾 Create seller document
  const newSeller = new sellerDTO({
    sellerId: data.sellerID,

    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,

    businessName: data.businessName,
    gstNumber: data.gstNumber,
    panNumber: data.panNumber,
    businessType: data.businessType,

    pickupAddress: data.pickupAddress,
    pincode: data.pincode,
    city: data.city,
    state: data.state,

    accountHolder: data.accountHolder,
    accountNumber: data.accountNumber,
    ifsc: data.ifsc,
    bankName: data.bankName,

    courierPartner: data.courierPartner,
    hasWarehouse: data.hasWarehouse || false,

    gstDoc: data.gstDoc || '',
    panDoc: data.panDoc || '',
  });

  const savedSeller = await newSeller.save();

  return savedSeller.sellerID;
}

export default { registerNewSeller };
