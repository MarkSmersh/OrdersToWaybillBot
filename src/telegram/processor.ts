import { Client } from "./client/client";
import { Update, SlashCommands } from "../../types/telegram";
import { SlashCommandsProcessor } from "./processors/slashCommands";
import { CallbacksProcessor } from "./processors/callbacks";


export = (client: Client, event: Update): void => {
    if (event.message) {
        event.message.entities?.forEach((messageEntity) => {
            if (messageEntity.type == "bot_command") {
                let command = event.message?.text?.split(" ").find((word) => word.startsWith("/")) as SlashCommands;
                SlashCommandsProcessor(client, event, command);
                return;
            }
        });
        return;
    }

    if (event.callback_query) {
        CallbacksProcessor(client, event);
        return;
    }
}

