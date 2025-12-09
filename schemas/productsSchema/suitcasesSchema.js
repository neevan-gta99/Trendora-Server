import mongoose from "mongoose";
import SKU_Genertor from "../../utils/skuGenerator.js";
import schemaOfVariant from "../../utils/schemaOfProductsVariants.js";

const suitcasesSchema = new mongoose.Schema({
  sellerID: { type: String },
  productID: { type: String, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  totalStock: { type: Number, default: 0 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number },
  isOnSale: { type: Boolean, default: true },
  status: { type: String, default: "Active" },
  material: { type: String, required: true },
  capacity: { type: String, required: true },
  shellType: { type: String, required: true },
  numWheels: { type: String, required: true },
  lockType: { type: String, required: true },
  features: [String],
  variants: [schemaOfVariant.sizeAndVariantsSchema],
  hot: { type: Boolean, default: false },
  sku: { type: String, unique: true },
  images: [
    {
      original: { type: String, required: true },
      optimizeUrl: { type: String, required: true },
      autoCropUrl: { type: String, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

suitcasesSchema.pre("save", async function (next) {
  if (this.price && this.discount) {
    this.finalPrice = this.price - (this.price * this.discount / 100);
  }

  // Generate SKU only once if it doesn't already exist
  if (!this.sku) {
    this.sku = SKU_Genertor.generateSKUforBSL(
      this.productID,
      this.name,
      this.material,
      this.capacity
    );
  }

  next();
});

export const suitcasesDTO = mongoose.models.suitcases || mongoose.model("suitcases", suitcasesSchema);
