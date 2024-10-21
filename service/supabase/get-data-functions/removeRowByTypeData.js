import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  const { data, error } = await supabase.from("call_data").select();

  const filteredArray = data.filter(
    (objWithNull) =>
      objWithNull.UID === "UID" ||
      objWithNull.UID === ""
  );

  if (filteredArray) {
    const response = await supabase
      .from("call_data")
      .delete()
      .eq("UID", filteredArray[0].UID)
      
  } else {
    return data;
  }
}
