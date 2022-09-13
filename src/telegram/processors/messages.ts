import { Client } from "../client/client";
import { Update } from "../../../types/telegram";

export async function CreateOrder (client: Client, event: Update): Promise<void> {
    await client.request("sendMessage", { text: `echo ${event.message.text}`, chat_id: event.message.chat.id })
}
