import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  const { data, error } = await supabase.from("form_data").select();

  console.log("form data: ", data)
  const filteredArray = data.filter(
    (objWithNull) =>
      objWithNull.name === null ||
      objWithNull.email === null ||
      objWithNull.phone === null
  );

  if (filteredArray) {
    const response = await supabase
      .from("form_data")
      .delete()
      .eq("created_at", filteredArray.created_at)
      .select();
  }
  else {
    return;
  }
}
