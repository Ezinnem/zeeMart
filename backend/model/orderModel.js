import mongoose from 'mongoose';
const shippingSchema = {
  address: { type: String, required: false },
  city: { type: String, required: false },
  postalCode: { type: String, required: false },
  country: { type: String, required: false },
};

const paymentSchema = {
  paymentMethod: { type: String, required: false }
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: false },
  qty: { type: Number, required: false },
  image: { type: String, required: false },
  price: { type: String, required: false },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number },
  taxPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: false
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;