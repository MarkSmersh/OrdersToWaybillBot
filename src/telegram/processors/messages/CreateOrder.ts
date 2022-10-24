import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";
import { StatesList } from "../../utils/stateConfig";

export default async function CreateOrder (client: Client, event: Message): Promise<StatesList | void> {
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2", // I really want to change it with web app, but not today
        text: `*Here is order*:`
    })
}