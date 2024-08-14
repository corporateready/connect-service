import axios from "axios";
import Papa from "papaparse";

const API_URL = "https://binaagency.pbx.moldcell.md/sys/crm_api.wcgp";

export const getAllHistory = async () => {
  try {
    const response = await axios.get(
      API_URL,
      {
        params: {
          cmd: "history",
          period: "today",
          type: "in",
          token: "a92bd86d-cbbd-4d53-a550-7fc2f7ca62de",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const csvData =
      [
        "UID",
        "type",
        "client",
        "account",
        "via",
        "start",
        "wait",
        "duration",
        "record",
      ] +
      "\n" +
      [response.data];

    Papa.parse(csvData, {
      header: false,
      complete: function (results) {
        results.data.forEach((item) => {
          if (results) {
            postDataToTinybird(item);
          }
        });
      },
    });

    const result = response.data;

    let dataCollection = []

    if (response.status === 200) {
      dataCollection.concat(response.data.length)
    }
    console.log("data collection ", dataCollection)

    // setInterval(() => {
    //   // console.log("new request!");
    // if (response.status === 200) {
    //   checkByNewCall(response.data);
    // }
     
    //   // console.log(getHistory)
    // }, [1000]);
    if (response.status) {
      postDataToTinybird(result);
      
    }
    console.log("getAllHistory is started!");
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function postDataToTinybird(data) {
  await fetch(
    "https://api.eu-central-1.aws.tinybird.co/v0/events?name=pbx__data_ds",
    {
      method: "POST",
      body: JSON.stringify({
        UID: data[0],
        type: data[1],
        client: data[2],
        account: data[3],
        via: data[4],
        start: data[5],
        wait: data[6],
        duration: data[7],
        record: data[8],
      }),
      headers: {
        Authorization:
          "Bearer p.eyJ1IjogIjE5MWViZjUyLTFlYmUtNDk0NS05YmVmLTNmZGUzYjk4ZjNmMyIsICJpZCI6ICIyNzI3NzBlNy1jNWM3LTRlYjgtYTZhZS04YTA2ODZhNzdjYzciLCAiaG9zdCI6ICJhd3MtZXUtY2VudHJhbC0xIn0.2B5cg_5SUIbcI_aYd3yheARoIHuUb1tH2BaOgclzNvM",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => console.log("data ", data));
}

export const checkByNewCall = async () => {
    console.log("checkByNewCall is started!");
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
};

async function requestNewData() {
  // setInterval(() => {
  //   // console.log("new request!");
    checkByNewCall();
  //   // console.log(getHistory)
  // }, [4000]);
  // console.log("new request!")
}

requestNewData();
