import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import postNewContact from "./../postNewContact.js"

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(eventData) {

  const { data, status, error } = await supabase.from("form_data").insert([
    {
      action_type: eventData.context.traits.action_type,
      element_location: eventData.context.traits.element_location,
      element_text: eventData.context.traits.element_text,
      element_type: eventData.context.traits.element_type,
      email: eventData.context.traits.email,
      form_location: eventData.context.traits.form_location,
      form_name: eventData.context.traits.form_name,
      form_type: eventData.context.traits.form_type,
      location: eventData.context.traits.location,
      name: eventData.context.traits.name,
      phone: eventData.context.traits.phone,
      created_at: new Date(),
      domain_source: eventData.context.traits.domain_source,
    },
  ]);
  
  // if (status === 200) {
  //   postNewContact();
  // }

}
