import adminDTO from '../schemas/adminSchema/adminCreds.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";


dotenv.config();


const getAdmin = async (req) => {
  try {

    // console.log("aayi call");

    let adminId = req.query?.adminId || req.admin?.adminId;
    let foundAdmin;

    if (adminId) {
      foundAdmin = await adminDTO.findOne({ adminId });
    }

    if (foundAdmin) {
      // console.log("✅ Seller found:", foundSeller.fullName);
      return { code: 200, message: foundAdmin };
    } else {
      console.warn("⚠️ Admin not found for ID:", adminId);
      return { code: 404, message: "Admin not found" };
    }
  } catch (err) {
    console.error("❌ Server error in getAdmin:", err.message);
    return { code: 500, message: "Internal server error" };
  }
};

const checkCred = async (req, res) => {  // Note: Added `res` parameter
  const { adminId, password } = req.body;


  console.log("Check Cred k andar " + adminId + " " + password)
  try {
    // 🔍 Step 1: Find seller by adminId
    const foundAdmin = await adminDTO.findOne({ adminId: adminId });

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin ID does not exist" });  // Updated response
    }

    // 🔐 Step 2: Compare password
    const isMatch = await bcrypt.compare(password, foundAdmin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });  // Updated response
    }

    // 🪙 Step 3: Generate JWT token
    const token = jwt.sign(
      {
        adminId: foundAdmin.adminId,
        adminMongoId: foundAdmin._id,
        adminName: foundAdmin.fullName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log("Token hai ", token)
    // � Step 4: Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,      // Prevent XSS attacks
      secure: true,        // HTTPS-only (enable in production)
      sameSite: 'None',  // CSRF protection
      maxAge: 3600000,     // 1hr expiry (auto-deletes)
    });

    // ✅ Success response
    return {
      code: 200,
      message: "Login successful",
      adminId: foundAdmin.adminId,
      adminName: foundAdmin.fullName
    };

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });  // Updated response
  }
};


const dbMigrate = async () => {

  const localClient = new MongoClient("mongodb://127.0.0.1:27017/NaveeGoods");
  const atlasClient = new MongoClient("mongodb+srv://naveegoods6542_db_user:sUL8YGKHNmVGex9M@cluster0.it0fcg1.mongodb.net/?appName=Cluster0");



  await localClient.connect();
  await atlasClient.connect();

  const localDB = localClient.db("NaveeGoods");
  const atlasDB = atlasClient.db("Trendora");

  const collections = await localDB.listCollections().toArray();

  for (const { name } of collections) {
    const localData = await localDB.collection(name).find().toArray();

    for (const doc of localData) {
      await atlasDB.collection(name).updateOne(
        { _id: doc._id },   // match by _id
        { $set: doc },      // update with local data
        { upsert: true }    // insert if not exists
      );
    }

    console.log(`✅ Synced collection: ${name} (${localData.length} docs checked)`);
  }

  await localClient.close();
  await atlasClient.close();

}

const admin_Model = { getAdmin, checkCred, dbMigrate };
export default admin_Model;
