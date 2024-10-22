import express from "express";
import "dotenv/config.js";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";
import EventEmitter from "events"
import updateAccessToken from "./service/supabase/data-features/updateAccessToken.js";
import startAccessToken from "./service/supabase/data-features/startAccessToken.js";
import handleRudderStackEvent from "./service/rudderstack/handleRudderStackEvent.js";
import postNewContact from "./service/postNewContact.js";
// import tokenId from "./service/database/get-data-functions/getTokenId.js";
import lengthCollectionEvent from "./service/pbx/length-collection-event/lengthCollectionEvent.js";

const eventEmitter = new EventEmitter()
const app = express();
const port = 3003;

const supabaseUrl = process.env.NODEJS_SUPABASE_URL;
const supabaseKey = process.env.NODEJS_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const refreshToken = process.env.NODEJS_REFRESH_TOKEN;

function myFunction() {
  console.log("Function executed!");
  startAccessToken(refreshToken);
  setInterval(() => updateAccessToken(refreshToken), 3500 * 1000);
}

eventEmitter.once('myEvent', myFunction);

eventEmitter.emit('myEvent');
eventEmitter.emit('myEvent');
// generateTokens(
//   "1000.ec50a6d17c8f5989384ef504f7877d3c.7731d73285821a47aaea3cb7087e7038"
// );

app.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    if (userId === "form_submitted") {
      console.log("Incoming Form Submit...");
      const eventData = req.body;
      const result = postNewContact(eventData);
      res.status(200).json(result);
    } else {
      const eventData = req.body;
      console.log("Incoming call...");
      const callResult = lengthCollectionEvent(eventData);

      res.status(200).json(callResult);
    }
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
