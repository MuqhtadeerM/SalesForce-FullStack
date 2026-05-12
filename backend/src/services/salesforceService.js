import jsforce from "jsforce";
import oauth2 from "../config/salesforce.js";
import fs from "fs";
import path from "path";

const TOKEN_FILE = path.resolve("token.json");

const saveToken = (data) => {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(data));
};

const loadToken = () => {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      return JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const getLoginUrlService = () => {
  return oauth2.getAuthorizationUrl({
    scope: "api refresh_token full",
    prompt: "login",
  });
};

export const authorizeSalesforceService = async (code) => {
  const conn = new jsforce.Connection({ oauth2 });

  await conn.authorize(code);

  const tokenData = {
    accessToken: conn.accessToken,
    instanceUrl: conn.instanceUrl,
    refreshToken: conn.refreshToken,
  };

  saveToken(tokenData);

  console.log("=== TOKEN SAVED TO FILE ===");
  console.log("Instance URL:", tokenData.instanceUrl);

  return {
    accessToken: conn.accessToken,
    instanceUrl: conn.instanceUrl,
    userInfo: conn.userInfo,
    conn,
  };
};

export const getConnection = () => {
  const tokenData = loadToken();

  console.log("=== GET CONNECTION ===");
  console.log("Token exists:", !!tokenData);

  if (!tokenData) {
    throw new Error("Not authenticated. Please login first.");
  }

  const conn = new jsforce.Connection({
    oauth2,
    accessToken: tokenData.accessToken,
    instanceUrl: tokenData.instanceUrl,
    refreshToken: tokenData.refreshToken,
  });

  return conn;
};
