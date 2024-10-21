import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import postNewContact from "./../../postNewContact.js";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  const { data: allData, error } = await supabase.from("form_data").select();
  if (error) {
    console.error("Error fetching data:", error.message);
  } else {
    console.log("Form data table: ", allData);
  }
}
