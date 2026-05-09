import jsforce from "jsforce";
import { env } from "./env.js";

console.log("=== SALESFORCE CONFIG ===");
console.log("CLIENT_ID:", env.SF_CLIENT_ID);
console.log("REDIRECT_URI:", env.SF_REDIRECT_URI);

const oauth2 = new jsforce.OAuth2({
  loginUrl: env.SF_LOGIN_URL,
  clientId: env.SF_CLIENT_ID,
  clientSecret: env.SF_CLIENT_SECRET,
  redirectUri: env.SF_REDIRECT_URI,
});

export default oauth2;
