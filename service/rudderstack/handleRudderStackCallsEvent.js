import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
// import postNewContact from "../postNewContact.js";
import removeRowByTypeData from "../supabase/get-data-functions/removeRowByEmptyData.js";
import postNewCallToZoho from "./../postNewCallToZoho.js";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(eventData) {
  const { data, status, error } = await supabase
    .from("roistat_call_data")
    .insert([
      {
        id: eventData.properties.id,
        callee: eventData.properties.callee,
        caller: eventData.properties.caller,
        custom_fields: eventData.properties.custom_fields,
        date: eventData.properties.date,
        duration: eventData.properties.duration,
        file_id: eventData.properties.file_id,
        google_client_id: eventData.properties.google_client_id,
        link: eventData.properties.link,
        marker: eventData.properties.marker,
        order_id: eventData.properties.order_id,
        status: eventData.properties.status,
        visit_id: eventData.properties.visit_id,
      },
    ]);

  if (error) {
    console.error("Error fetching data:", error.message);
  } else {
    // console.log("Table Row Call_Data was Created:");
    // removeRowByTypeData()
  }
}
