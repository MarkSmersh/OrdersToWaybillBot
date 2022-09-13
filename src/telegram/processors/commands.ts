import { Client } from "../client/client";
import { Update } from "../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC,
         ReplyMarkupConstructor as RMC,
         ReplyButtonConstructor as RBC  } from "../utils/keyboardConstructor";
import { Order } from "../../database/models/models";
import { StatesList } from "../utils/stateConfig";

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname + "/../../.env") });

export async function startGreetings(client: Client, event: Update): Promise<StatesList | void> {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: `*Good ${getCurrentTimeString()}*, [${event.message?.chat.first_name}](tg://user?id=${event.message?.chat.id})`});

    if (!process.env.ALLOWED_USERS?.split(" ").includes(event.message?.chat.id.toString())) {
        await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
            text: `Oh, seems you are not allowed to use this bot\\. If that error, send this ID: \`${event.message?.chat.id}\` to [him](tg://user?id=562140704)`});
        return;
    }
        
    let createdCount = 0, 
        packagedCount = 0,
        preparedCount = 0,
        sendedCount = 0
        
    let orders = await Order.findAll();
    orders.forEach((order) => {
        switch (order.orderState) {
            case "created": createdCount++; break;
            case "packaged": packagedCount++; break;
            case "prepared": preparedCount++; break;
            case "sended": sendedCount++; break;
        }
    })
    
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: `*THE LIST OF CURRENT ORDERS*\n
🧾 Created: \`${createdCount}\`
📦 Packaged: \`${packagedCount}\`
📮 Prepared: \`${preparedCount}\`
📨 Sended: \`${sendedCount}\`\n`,
        reply_markup: RMC(true, false, "", false,
            [
                RBC("📝 Create order")
            ],
            [
                RBC("📦 Select packaged"), RBC("📮 Create waybills")
            ],
            [
                RBC("📑 Orders list")
            ]
        )
    });

    return "default";
}

function getCurrentTimeString () {
    let data = new Date();
    let hour = data.getUTCHours() + 3;
    (hour > 24) ? hour - 24 : hour

    if (hour < 6) return "night 🌚";
    if (hour < 12) return "morning 🌞";
    if (hour < 18) return "afternoon 🌝";
    if (hour < 24) return "evening 🌛";
}

export async function helpMessage(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: `*Greetings*, [${event.message?.chat.first_name}](tg://user?id=${event.message?.chat.id})`});
}

export async function pingCalculation(client: Client, event: Update) {
    let timeBefore = Date.now();

    let message = await client.request("sendMessage", { chat_id: event.message?.chat.id,
        text: `Ping: calculating...`});

    let timeAfter = Date.now();

    await client.request("editMessageText", { chat_id: event.message?.chat.id, message_id: message.message_id, 
        text: `Ping: ${timeAfter - timeBefore}ms`})
}

export async function unknownCommand(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id,
        text: `There\`s no such command. Use Menu to get full list of available commands`});
}