import axios from "axios";
import Papa from "papaparse";

const API_URL = "https://binaagency.pbx.moldcell.md/sys/crm_api.wcgp";

// export default async function checkByNewCall() {
//   console.log("checkByNewCall is started!");
  // try {
  //   const response = await axios.get(
  //     API_URL,
  //     {
  //       params: {
  //         cmd: "history",
  //         period: "today",
  //         type: "in",
  //         limit: 1,
  //         token: "a92bd86d-cbbd-4d53-a550-7fc2f7ca62de",
  //       },
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const csvData =
  //     [
  //       "UID",
  //       "type",
  //       "client",
  //       "account",
  //       "via",
  //       "start",
  //       "wait",
  //       "duration",
  //       "record",
  //     ] +
  //     "\n" +
  //     [response.data];

  //   Papa.parse(csvData, {
  //     header: false,
  //     complete: function (results) {
  //       results.data.forEach((item) => {
  //         if (results) {
  //           postDataToTinybird(item);
  //         }
  //       });
  //     },
  //   });

  //   const result = response.data;

  //   console.log("return ", response.data.length);

  //   if (response.status) {
  //     postDataToTinybird(result);
  //   }

  //   return result;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
// }
