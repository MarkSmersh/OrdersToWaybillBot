import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";

export default async function unknownCommand(client: Client, event: Message) {
    await client.request("sendMessage", { chat_id: event.chat.id,
        text: `There\`s no such command. Use Menu to get full list of available commands`});
}