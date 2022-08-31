import { Client as TelegramClient } from "./telegram/client/client";
import processor from "./telegram/processor";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const c = new TelegramClient(process.env.TOKEN as string); // insert your token here
c.start();

c.once("start", (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

c.on("update", async (e) => {
    processor(c, e);
});