import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  const { data, error } = await supabase.from("call_data").select();

  const filteredArray = data.filter(
    (objWithNull) =>
      objWithNull.type === null 
  );

  if (filteredArray) {
    const response = await supabase
      .from("call_data")
      .delete()
      .eq("id", filteredArray[0].id)
      .select();
  } else {
    return;
  }
}
