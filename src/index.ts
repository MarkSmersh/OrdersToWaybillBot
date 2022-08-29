import { Client } from "./client/client";

const c = new Client(process.env.TOKEN || "1739384953:AAGieCC_3gwgUXttnd_ambeZEizfSzr6bqI"); // insert your token here
c.start();

c.once("start", (e) => {
    console.log(`Bot ${e?.first_name} has started!`);
});

c.on("update", (e) => {
    console.log(e.message);
});