import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteRowData(tokenId) {
  const { data, error } = await supabase
    .from("accessToken")
    .delete()
    .eq("id", tokenId);

  if (error) {
    console.error("Error fetching data:", error.message);
  } else {
    console.log("Row was deleted!");
  }
}

export default deleteRowData;
