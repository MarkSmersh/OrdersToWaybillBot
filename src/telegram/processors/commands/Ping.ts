import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";

export default async function pingCalculation(client: Client, event: Message) {
    let timeBefore = Date.now();

    let message = await client.request("sendMessage", { chat_id: event.chat.id,
        text: `Ping: calculating...`});

    let timeAfter = Date.now();

    await client.request("editMessageText", { chat_id: event.chat.id, message_id: message.message_id, 
        text: `Ping: ${timeAfter - timeBefore}ms`})
}