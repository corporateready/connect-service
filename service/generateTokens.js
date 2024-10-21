import axios from "axios";

async function generateTokens(authCode) {
  const client_id = "1000.SKXPGAACQHTAEKB0L18ZM2ANO9FQZG";
  const client_secret = "76133cbbde1b028778147cf8cf879a18900e558553";
  const redirect_uri = "https://accounts.zoho.eu";

  const response = await axios.post(
    "https://accounts.zoho.eu/oauth/v2/token",
    null,
    {
      params: {
        code: authCode,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: "authorization_code",
      },
    }
  );

const generated_refresh_token = response.data.refresh_token;

  console.log("Tokens:", generated_refresh_token);
  console.log("Tokens:", response.data);

  // return generated_refresh_token;
}

export default generateTokens;