import { Client as TelegramClient } from "./telegram/client/client";
import processor from "./telegram/processor";

const c = new TelegramClient(process.env.TOKEN || "1739384953:AAFAWzxnGPEatkkIbS39ZRNtAMV2DQU8Qws"); // insert your token here
c.start();

c.once("start", (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

c.on("update", async (e) => {
    processor(c, e);
});