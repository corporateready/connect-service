import { createClient } from "@supabase/supabase-js";
import "dotenv/config"

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createRowData(access_token) {
  const { data, error } = await supabase.from("accessToken").insert([
    {
      created_at: new Date(),
      token: access_token,
    },
  ]);

  if (error) {
    console.error("Error fetching data:", error.message);
  } else {
    console.log("Token was Updated!");
  }

}

export default createRowData;
