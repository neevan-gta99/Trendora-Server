import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID; // 👈 Verify Service SID bhi env mai rakho

const client = twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body; // 👈 client se phone number aayega

    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }

    // Twilio Verify API call
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: "sms" });

    return res.status(200).json({
      message: "OTP sent successfully",
      sid: verification.sid,
      status: verification.status,
    });
  } catch (error) {
    console.error("Twilio OTP Error:", error);
    return res.status(500).json({ error: error.message });
  }

};

const verifyOtp = async (req, res, next) => {
  try {
    const { phone, code } = req.body; // 👈 client se phone + OTP aayega

    if (!phone || !code) {
      return res.status(400).json({ error: "Phone and OTP code required" });
    }

    // Twilio Verify API call for OTP check
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code });

    if (verification_check.status === "approved") {
     next();
    } else {
      return res.status(400).json({
        error: "Invalid OTP",
        status: verification_check.status,
      });
    }
  } catch (error) {
    console.error("Twilio Verify Error:", error);
    return res.status(500).json({ error: error.message });
  }
};


const twilio_Auths = { sendOtp, verifyOtp };
export default twilio_Auths;
