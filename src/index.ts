import { Client as TelegramClient } from "./telegram/client/client";
import processor from "./telegram/processor";

import database from "./database/database";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

console.log(process.env.TOKEN);
const c = new TelegramClient(process.env.TOKEN as string); // insert your token here

c.once("load", async () => {
    await database.sync();
    await database.authenticate();
    c.start();
})

c.once("start", (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

c.on("update", async (e) => {
    await processor(c, e);
});

c.load();