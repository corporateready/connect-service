import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
// import deleteRowData from "./data-fetches/deleteRowData.js";
// import createRowData from "./data-fetches/createRowData.js";
// import refreshAccessToken from "./../createRefreshToken.js";

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function getTableData(refreshToken) {
  const { data, error } = await supabase.from("accessToken").select("*");
  if (!data.length) {
    console.log("Table is not empty!");
    // Create new token
    createRowData(refreshToken);
  } else {
    console.log("Table is empty!");
    // Delete old token
    // const { data, error } = await supabase.from("accessToken").select("id");
    // data.map((token) => {
    //   let tokenId = token.id;
    //   return deleteRowData(tokenId);
    // });
    // Create new token
  }
  // const { data, error } = await supabase.from("accessToken").select("*");
  // let arrayLength = data.length;
  // if (error) {
  //   console.error("Error fetching data:", error.message);
  // } else {
  //   if (arrayLength) {
  //     const { data, error } = await supabase.from("accessToken").select("id");
  //     data.map((token) => {
  //       let tokenId = token.id;
  //       return deleteRowData(tokenId);
  //     });
  //   }
  //   if (!arrayLength) {
  //     setInterval(() => refreshAccessToken(refreshToken), 2 * 1000)
  //   }
  //   return arrayLength;
  // }
}

export default getTableData;
