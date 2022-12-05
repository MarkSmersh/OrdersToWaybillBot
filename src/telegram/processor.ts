import { Client } from "./client/client";
import { Update } from "../../types/telegram";
import { StateFilter, FunctionReturn } from "./state/stateFilter";
import { StatesList } from "./state/stateConfig";
import { UserState } from "../database/models/models";
import { SlashCommands, MessageData, CallbackData } from "../../types/telegram";

export = async (client: Client, event: Update) => {
    try {
        await UserState.findOrCreate({ where: { user_id: event.message?.chat.id },
            defaults: { user_id: event.message?.chat.id, state: "default" } })
    } catch {}
        
    let newState = await stateHandler(client, event);

    if (newState) {
        await UserState.update({ state: newState },
            { "where": { user_id: event.message?.chat.id || event.callback_query.from.id } }
        );
    }
}

async function stateHandler (client: Client, event: Update): Promise<FunctionReturn> {
    if (event.message) {
        let state = (await UserState.findOne({ where: { user_id: event.message.chat.id }}))?.state as StatesList
        if (event.message.entities) {
            for (let i = 0; i < event.message.entities.length; i++) {
                if (event.message.entities[i].type == "bot_command") {
                    let command = event.message?.text?.split(" ").find((word) => word.startsWith("/")) as SlashCommands;
                    return await StateFilter("default", "command", command, [client, event.message]);
                }
            }
        }
        return await StateFilter(state, "message", event.message.text as MessageData, [client, event.message]);
    }
    if (event.callback_query) {
        let state = (await UserState.findOne({ where: { user_id: event.callback_query.from.id }}))?.state as StatesList;
        await StateFilter("default", "callback", event.callback_query.data as CallbackData, [client, event.callback_query]);
        return await StateFilter(state, "callback", event.callback_query.data as CallbackData, [client, event.callback_query]);
    }
}

