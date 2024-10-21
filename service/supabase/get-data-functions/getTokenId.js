import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  const { data, error } = await supabase
    .from("accessToken")
    .select("token");
  data.map((token) => {
    let tokenValue = token;
    console.log("token value: ", tokenValue)
    // return tokenId;
  });
}
