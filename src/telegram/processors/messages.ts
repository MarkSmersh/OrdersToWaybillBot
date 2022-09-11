import { Client } from "../client/client";
import { Update } from "../../../types/telegram";
import { StatesList } from "../utils/stateConfig";

export async function MessageEcho (client: Client, event: Update): Promise<void> {
    await client.request("sendMessage", { text: `echo ${event.message.text}`, chat_id: event.message.chat.id })
}

export async function MessageTest (client: Client, event: Update): Promise<StatesList> {
    await client.request("sendMessage", { text: `Changed state to test`, chat_id: event.message.chat.id })
    return "test";
}

export async function MessageUntest (client: Client, event: Update): Promise<StatesList> {
    await client.request("sendMessage", { text: `Changed state to untest`, chat_id: event.message.chat.id })
    return "start";
}

