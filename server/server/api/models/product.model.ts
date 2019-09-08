import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  productName: String,
  productDescription: String,
  productCategory: String,
  productPrice: String,
  productImage: String,
  productSeller: String,
  isBestProduct: Boolean,
  isTopProduct: Boolean,
  productRating: Number
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productCategory: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImage: { type: String, required: true },
  productSeller: { type: String, required: true },
  isBestProduct: { type: String, required: true },
  isTopProduct: { type: String, required: true },
  productRating: { type: Number, required: true }

});

// Export the model and return your IUser interface
export default mongoose.model<IProduct>('Product', UserSchema);
