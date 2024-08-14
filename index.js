import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import { getAllHistory } from "./getAllHistory.js";
import {checkByNewCall} from "./getAllHistory.js";

dotenv.config();

const app = express();

app.use(express.json());

function startAtSpecificTime(targetHour, targetMinute, targetSecond) {
  const now = new Date();

  const targetTime = new Date();
  targetTime.setHours(targetHour, targetMinute, targetSecond, 0);

  let delay = targetTime.getTime() - now.getTime();

  console.log("delay ", delay);

  if (delay < 0) {
    targetTime.setDate(targetTime.getDate() + 1);
    delay = targetTime.getTime() - now.getTime();
  }

  if (delay < 0) {
  }

  setTimeout(() => {
    getAllHistory();
  }, delay);
}

startAtSpecificTime(18, 59, 0);

// async function getAllHistory() {
//   try {
//     //    console.log(response.data);
//     const response = await axios.get(
//       //  `https://binaagency.pbx.moldcell.md/sys/crm_api.wcgp?cmd=history&period=today&type=in&token=a92bd86d-cbbd-4d53-a550-7fc2f7ca62de`,
//       `https://binaagency.pbx.moldcell.md/sys/crm_api.wcgp?cmd=history&period=today&type=in&token=a92bd86d-cbbd-4d53-a550-7fc2f7ca62de`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     //  console.log("res length", res.data.length)
//     //  console.log(response.status);
//     //  console.log(response.data);
//     const csvData =
//       [
//         "UID",
//         "type",
//         "client",
//         "account",
//         "via",
//         "start",
//         "wait",
//         "duration",
//         "record",
//       ] +
//       "\n" +
//       [response.data];

//     Papa.parse(csvData, {
//       header: false,
//       complete: function (results) {
//         results.data.forEach((item) => {
//           if (results) {
//             postDataToTinybird(item);
//           }
//         });
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async function transportingCallsData() {
// try {

// console.log(response.data);
// const response = await axios.get(
//   `https://binaagency.pbx.moldcell.md/sys/crm_api.wcgp?cmd=history&period=today&type=in&token=a92bd86d-cbbd-4d53-a550-7fc2f7ca62de`,
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );
// console.log("res length", res.data.length)
// console.log(response.status);
// console.log(response.data);
// const csvData =
//   [
//     "UID",
//     "type",
//     "client",
//     "account",
//     "via",
//     "start",
//     "wait",
//     "duration",
//     "record",
//   ] +
//   "\n" +
//   [response.data];
// Papa.parse(csvData, {
//   header: false,
//   complete: function (results) {
//     results.data.forEach((item) => {
//       if (results) {
//         postDataToTinybird(item);
//       }
//     });
//   },
// });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// async function postDataToTinybird(data) {
//   await fetch(
//     "https://api.eu-central-1.aws.tinybird.co/v0/events?name=pbx__data_ds",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         UID: data[0],
//         type: data[1],
//         client: data[2],
//         account: data[3],
//         via: data[4],
//         start: data[5],
//         wait: data[6],
//         duration: data[7],
//         record: data[8],
//       }),
//       headers: {
//         Authorization:
//           "Bearer p.eyJ1IjogIjE5MWViZjUyLTFlYmUtNDk0NS05YmVmLTNmZGUzYjk4ZjNmMyIsICJpZCI6ICIyNzI3NzBlNy1jNWM3LTRlYjgtYTZhZS04YTA2ODZhNzdjYzciLCAiaG9zdCI6ICJhd3MtZXUtY2VudHJhbC0xIn0.2B5cg_5SUIbcI_aYd3yheARoIHuUb1tH2BaOgclzNvM",
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => console.log("data ", data));
// }

app.listen(3003, () => {
  console.log("Started server!");
});
