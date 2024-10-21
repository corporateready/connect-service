import axios from "axios";
import "dotenv/config.js";
import createRowData from "./supabase/data-features/createRowData.js";

const clientId = process.env.NODEJS_CLIENT_ID;
const clientSecret = process.env.NODEJS_CLIENT_SECRET;
const redirectUri = process.env.NODEJS_REDIRECT_URI;

async function refreshAccessToken(refreshToken) {
  const client_id = clientId;
  const client_secret = clientSecret;
  const redirect_uri = redirectUri;

  try {
    const response = await axios.post(`${redirect_uri}/oauth/v2/token`, null, {
      params: {
        refresh_token: refreshToken,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: "refresh_token",
      },
    });
    const newToken = await response.data.access_token;

    if (response.data) {
      createRowData(newToken);
    }
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error.message
    );
  }
}

export default refreshAccessToken;
