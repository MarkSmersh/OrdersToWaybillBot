import { Client } from "../client/client";
import { Update } from "../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC,
         ReplyMarkupConstructor as RMC,
         ReplyButtonConstructor as RBC  } from "../utils/keyboardConstructor";
import { UserState, Order } from "../../database/models/models";
import { StatesList } from "../utils/stateConfig";
import NovaposhtaClient from "../../novaposhta/client/NovaposhtaClient";

export async function startGreetings(client: Client, event: Update): Promise<StatesList> {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: `*Good ${getCurrentTimeString()}*, [${event.message?.chat.first_name}](tg://user?id=${event.message?.chat.id})`});
        
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
📨 Sended: \`${sendedCount}\`\n`});

    return "start";
}

function getCurrentTimeString () {
    let data = new Date();
    let hour = data.getTimezoneOffset() + 3;

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