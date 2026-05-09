import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,

  SF_LOGIN_URL: process.env.SF_LOGIN_URL,

  SF_CLIENT_ID: process.env.SF_CLIENT_ID,

  SF_CLIENT_SECRET: process.env.SF_CLIENT_SECRET,

  SF_REDIRECT_URI: process.env.SF_REDIRECT_URI,

  NODE_ENV: process.env.NODE_ENV || "development",
};
