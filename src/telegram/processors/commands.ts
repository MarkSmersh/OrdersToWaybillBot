import { Client } from "../client/client";
import { Update } from "../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC } from "../utils/keyboardConstructor";
import { UserState } from "../../database/models/models";
import { StatesList } from "../utils/stateFilter";
import NovaposhtaClient from "../../novaposhta/client/NovaposhtaClient";

export async function startGreetings(client: Client, event: Update): Promise<StatesList> {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, 
        text: "Start had detected", 
        reply_markup: IMC (
            [
                IBC("Test Up", "1"),
            ],
            [
                IBC("Test Left", "2"), IBC("Test Right", "3")
            ],
            [
                IBC("Test Bottom", "4")
            ]
        )
    });

    await UserState.findOrCreate({ where: { user_id: event.message?.chat.id},
        defaults: { user_id: event.message?.chat.id, state: "default" }
    });

    let data = await NovaposhtaClient.request("Address", "searchSettlements", { 
        CityName: "київ",
        Limit: "0",
        Page: "0"
    });

    return "start";
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