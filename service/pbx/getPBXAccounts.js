import { createClient } from "@supabase/supabase-js";
import Papa from "papaparse";
import "dotenv/config.js";
import axios from "axios";
import postNewCallToZoho from "./../postNewCallToZoho.js";
import postNewCalls from "./../postNewCalls.js";

const PBX_API_URL = process.env.NODEJS_PBX_API_URL;
const PBX_TOKEN = process.env.NODEJS_PBX_TOKEN;

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Index() {
  try {
    const response = await axios.get(
      PBX_API_URL,
      {
        params: {
          cmd: "history",
          period: "today",
          limit: 1,
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

    if (status === 200) {
      const csvData = `UID,type,client,account,via,start,wait,duration,record\n${result}`;

      Papa.parse(csvData, {
        header: true,
        complete: async function (results) {
          let namePart = results.data[0].account.split("@")[0];
          let nameArray = namePart.split("_");

          let formattedName = nameArray
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          if (status === 200) {
            const { data, status, error } = await supabase
              .from("call_data")
              .insert({
                UID: results.data[0].UID,
                type: results.data[0].type,
                client: results.data[0].client,
                account: formattedName,
                via: results.data[0].via,
                start: results.data[0].start,
                wait: results.data[0].wait,
                duration: results.data[0].duration,
                record: results.data[0].record,
                created_at: new Date(),
              });
            return getPBXDataFromSupa(results.data[0].UID);
          }
        },
      });
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getPBXDataFromSupa(uid) {
  const { data, status, error } = await supabase.from("call_data").select();

  if (status === 200) {
    console.log("Started filtering!");
    const filtered = data.filter((itemId) => itemId.UID === uid);

    return postNewCallToZoho(filtered), postNewCalls(filtered);
  }
}
