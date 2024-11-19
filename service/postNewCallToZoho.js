import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(filtered) {
  const apiUrl = "https://www.zohoapis.eu/crm/v2/Calls";

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
            Call_Duration: null,
            Description: filtered[0].account,
            Caller_ID: "2222333344443366",
            id: "732174000000423366",
            Call_Status: filtered[0].type,
            Created_Time: new Date().toDateString(),
            Call_Start_Time: filtered[0].start,
            Subject: "incoming call",
            Call_Type: filtered[0].type,
            Call_Result: filtered[0].client,
            Call_Duration_in_seconds: 19,
            Dialled_Number: filtered[0].via,
            Voice_Recording__s: filtered[0].record,
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

