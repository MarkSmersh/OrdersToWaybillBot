import { Client } from "./client/client";

const c = new Client(process.env.TOKEN || ""); // insert your token here
c.start();

c.once("start", (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

c.on("update", (e) => {
    console.log(e.message.date);
});