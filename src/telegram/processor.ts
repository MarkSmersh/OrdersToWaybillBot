import { Client } from "./client/client";
import { Update, SlashCommands } from "../../types/telegram";
import { CallbacksProcessor } from "./processors/callbacks";
import { stateConfig, statesList } from "./utils/stateConfig";
import { UserState } from "../database/models/models";

export = async (client: Client, event: Update) => {
    let newState = await stateHandler(client, event);

    if (newState) {
        UserState.update({ state: newState },
            { "where": { user_id: event.message?.chat.id } }
        );
    }
}

async function stateHandler (client: Client, event: Update): Promise<void | statesList> {
    if (event.message) {
        if (event.message.entities) {
            for (let i = 0; i < event.message.entities.length; i++) {
                if (event.message.entities[i].type == "bot_command") {
                    let command = event.message?.text?.split(" ").find((word) => word.startsWith("/")) as SlashCommands;
                    return await stateConfig.default.commands?.[command]?.(client, event)
                }
            }
        }
    }
}

