import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(filtered) {
  const apiUrl = "https://www.zohoapis.eu/crm/v2/Marketing_Activity";

  try {
    const {
      data: accessToken,
      status,
      error: err,
    } = await supabase.from("accessToken").select("token");

    const response = await axios.post(
      apiUrl,
      {
        data: [
          {
            Activity_Type: "Call",
            Name: "Incoming Call",
            Email: "",
            Callee: `+${filtered[0].via}`,
            Caller: `+${filtered[0].client}`,
            Call_Status: filtered[0].type,
            Accepted_Person: filtered[0].account,
            Phone: `+${filtered[0].client}`,
            Link_Voice_Record: filtered[0].record,
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
      "Error creating contact:"
      // error.response ? error.response.data : error.message
    );
  }
}
