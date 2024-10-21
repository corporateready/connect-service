import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(eventData) {
  const apiUrl = "https://www.zohoapis.eu/crm/v2/Marketing_Activity";

  try {
    const { data: accessToken, error: err } = await supabase
      .from("accessToken")
      .select("token");

    const response = await axios.post(
      apiUrl,
      {
        data: [
          {
            Activity_Type: "Form",
            Name: "Form Submitted",
            Email: eventData.context.traits.email,
            Client_Name: eventData.context.traits.name,
            Caller: `+${eventData.context.traits.phone}`,
            Phone: `+${eventData.context.traits.phone}`,
            Domain: eventData.context.traits.domain_source,
          },
        ],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken.map((token) => {
            const acc_token = token.token;
            return acc_token;
          })}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating contact:",
      error.response ? error.response.data : error.message
    );
  }
}
