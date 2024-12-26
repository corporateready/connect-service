import express from "express";
import axios from "axios";
import "dotenv/config.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import EventEmitter from "events";
import updateAccessToken from "./service/supabase/data-features/updateAccessToken.js";
import startAccessToken from "./service/supabase/data-features/startAccessToken.js";
import postNewContact from "./service/postNewContact.js";
import lengthCollectionEvent from "./service/pbx/length-collection-event/lengthCollectionEvent.js";
import { PostHog } from "posthog-node";

const eventEmitter = new EventEmitter();
const app = express();
const port = 3003;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const refreshToken = process.env.NODEJS_REFRESH_TOKEN;

function myFunction() {
  return startAccessToken(refreshToken);
}

eventEmitter.on("myEvent", myFunction);

eventEmitter.emit("myEvent");

function startHourlyTask() {
  
  setInterval(() => updateAccessToken(refreshToken), 3500 * 1000);
}

startHourlyTask();

const posthog = new PostHog("phc_v2HcUOBJx1tfJJpA37ipBy9lDvMwRPzrqxT3m4NetAP", {
  host: "https://eu.i.posthog.com", // Замените, если используете собственный хост PostHog
});

process.on("exit", () => {
  posthog.shutdown();
});

app.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const eventName = req.body.event;

    if (userId === "form_submitted") {
      console.log("Incoming Form Submit...");
      const eventData = req.body;
      const result = postNewContact(eventData);
      res.status(200).json(result);
    }
    if (eventName === "webhook_source_event") {
      const eventData = req.body;
      const googleClientId = eventData.properties.google_client_id;
      console.log("Incoming call...");

        posthog.capture({
          distinctId: googleClientId || "anonymous",
          event: eventName,
        });
      const callResult = lengthCollectionEvent(eventData,googleClientId);
      res.status(200).json(callResult);
    }
    return;
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});