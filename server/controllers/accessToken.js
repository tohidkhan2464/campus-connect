const { JWT } = require("google-auth-library");
// const axios = require("axios");
const fs = require("fs");

const SERVICE_ACCOUNT_FILE =
  "./react-chat-app-25799-firebase-adminsdk-3lnzb-0784d09dd5.json";
const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE));
const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];
const client = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: SCOPES,
});

exports.generateAccessToken = async () => {
  const tokens = await client.authorize();
//   console.log("Access Token: ", tokens.access_token);
  return tokens.access_token;
};