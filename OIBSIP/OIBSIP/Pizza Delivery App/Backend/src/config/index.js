import dotenv from "dotenv";
const config = {
  PORT: process.env.PORT || 3396,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/pizza",
  JWT_SECRET: process.env.JWT_SECRET || "sandeepKdasari121",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "1d",
};
export default config;
