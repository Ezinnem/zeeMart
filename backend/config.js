import dotenv from 'dotenv';

dotenv.config();
export default {
  PORT: process.env.PORT || 9000,
//   MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
  // MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/zeemart',
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  
}