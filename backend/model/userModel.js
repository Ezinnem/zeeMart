import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: {
    type: String, required: false, unique: true, dropDups: true,
  },
  phone: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  isAdmin: { type: Boolean, required: false, default: false },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
