import { Telegram, Message } from "@marksmersh/telegramts";

export default async function unknownCommand(client: Telegram, event: Message) {
    await client.request("sendMessage", { chat_id: event.chat.id,
        text: `There\`s no such command. Use Menu to get full list of available commands`});
}