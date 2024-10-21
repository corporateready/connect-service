import { createClient } from "@supabase/supabase-js";
import Papa from "papaparse";
import "dotenv/config.js";
import axios from "axios";
import getPBXAccounts from "../getPBXAccounts.js"

const PBX_API_URL = process.env.NODEJS_PBX_API_URL;
const PBX_TOKEN = process.env.NODEJS_PBX_TOKEN;

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index(eventData) {
  try {
    const response = await axios.get(
      PBX_API_URL,
      {
        params: {
          cmd: "history",
          period: "today",
          type: "in",
          token: PBX_TOKEN,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data;
    const status = response.status;

    const { data: currentCounter, error } = await supabase
      .from("pbx_length_collection")
      .insert({ id: result.length, counter: result.length });

    if (status === 200) {
      const { data: counterValue, error } = await supabase
        .from("pbx_length_collection")
        .select();
      let lastRowCounter = counterValue.slice(-1);
      let prevRowCounter = counterValue.slice(-2);

      if (lastRowCounter < prevRowCounter) {
       return getPBXAccounts();
      } 
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
