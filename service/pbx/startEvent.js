// import { createClient } from "@supabase/supabase-js";
// import Papa from "papaparse";
// import "dotenv/config.js";
// import axios from "axios";

// const PBX_API_URL =
//   "https://93a5-62-221-72-65.ngrok-free.app/";
// const PBX_TOKEN = "111a222b333c444d";

// // const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
// // const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

// // const supabase = createClient(supabaseUrl, supabaseKey);

// export default async function Index() {
//   try {
//     const response = await axios.post(
//       PBX_API_URL,
//       {
//         params: {
//           cmd: "event",
//           // period: "today",
//           type: "INCOMING",
//           // limit: 1,
//           cmd_token: PBX_TOKEN,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // const csvData =
//     //   [
//     //     "UID",
//     //     "type",
//     //     "client",
//     //     "account",
//     //     "via",
//     //     "start",
//     //     "wait",
//     //     "duration",
//     //     "record",
//     //   ] +
//     //   "\n" +
//     //   [response.data];
//     // Papa.parse(csvData, {
//     //   header: false,
//     // complete: function (results) {
//     //   results.data.forEach(async (item) => {
//     //     if (results) {
//     //       let { data, error } = await supabase.rpc("null-filter-function");
//     //       if (error) console.error(error);
//     //       else {
//     //         const { data, error } = await supabase.from("call_data").insert([
//     //           {
//     //             UID: item[0],
//     //             type: item[1],
//     //             client: item[2],
//     //             account: item[3],
//     //             via: item[4],
//     //             start: item[5],
//     //             wait: item[6],
//     //             duration: item[7],
//     //             record: item[8],
//     //             created_at: new Date(),
//     //           },
//     //         ]);
//     //       }
//     //     }
//     //   });
//     // },
//     // });
//     const result = response.data;
//     // console.log("return ", result);
//     // let resultLength = result.length;
//     // let array = [];
//     // array.push(resultLength);
//     // console.log("array length ", array)
//     // let newArray = []

//     // if (!array) {
//     //   console.log("Collection was changed!!!");
//     //   //     postDataToTinybird(result);
//     // }
//     return result;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
