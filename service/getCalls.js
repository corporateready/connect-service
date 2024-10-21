import axios from "axios";
import "dotenv/config.js";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getCalls() {
  try {
    const { data, error } = await supabase.from("accessToken").select("token");

    const response = await axios.get("https://www.zohoapis.eu/crm/v2/Calls", {
      headers: {
        Authorization: `Zoho-oauthtoken ${data.map((token) => {
          const acc_token = token.token;
          return acc_token;
        })}`,
      },
    });
    console.log("Calls:", response.data);
  } catch (error) {
    console.error("Error retrieving calls:", error);
  }
}

export default getCalls;
