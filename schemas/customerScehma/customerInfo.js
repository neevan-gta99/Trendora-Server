import mongoose from 'mongoose';
import ID_Generator from '../../utils/sequenceIdGenerator.js';


const customerInfo = new mongoose.Schema({
  customerId: {
    type: String,
    unique: true,
  },

  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, lowercase: true },
  phone: { type: String, required: true },
  receiveAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

customerInfo.pre('save', async function (next) {

  if (this.customerId) return next(); // already set
  
  try {
   this.customerId = await ID_Generator.getNextId('ctmr','customer')
    next();
  } catch (err) {
    next(err);
  }
});

const customerDTO = mongoose.models.Customer || mongoose.model('Customer', customerInfo);
export default customerDTO;
