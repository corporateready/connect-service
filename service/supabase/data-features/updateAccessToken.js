import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import deleteRowData from "./deleteRowData.js";
import refreshAccessToken from "../../createRefreshToken.js";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(refreshToken) {
  console.log("Refreshed token!");
  const { data, status, error } = await supabase.from("accessToken").select("*");
  if ( status === 200 ) {
    const { data, error } = await supabase.from("accessToken").select("id");
    data.map((token) => {
      let tokenId = token.id;
      return deleteRowData(tokenId);
    });

    if (status === 200) {
      refreshAccessToken(refreshToken);
    }
  } else {
    return;
  }
}
