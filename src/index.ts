import { Client as TelegramClient } from "./telegram/client/client";
import processor from "./telegram/processor";

import database from "./database/database";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import { updateCounterparties, updateCounterpartiesContactPersons } from "./utils/updateFromServer";

const c = new TelegramClient(process.env.TOKEN as string); // insert your token here

c.once("load", async () => {
    await database.sync();
    await database.authenticate();

    await updateCounterparties();
    await updateCounterpartiesContactPersons();

    setInterval(() => updateCounterparties(), 86400000);
    setInterval(() => updateCounterpartiesContactPersons(), 86400000);

    c.start();
})

c.once("start", async (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

c.on("update", async (e) => {
    await processor(c, e);
});

c.load();