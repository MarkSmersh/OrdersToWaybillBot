import { Update } from "../../../types/telegram";
import { Client } from "../client/client";
import { SlashCommands } from "../../../types/telegram";
import { startGreetings, helpMessage, pingCalculation, unknownCommand } from "../processors/slashCommands";

export const stateConfig: Record<statesList, MapModel> = {
    "default": {
        "commands": {
            "/start": startGreetings,
            "/ping": pingCalculation,
            "/help": helpMessage,
            "default": unknownCommand
        }
    },
    "start": {
        "message": {
            "default": pingCalculation
        }
    }
}

interface MapModel {
    commands?: {
        [key in SlashCommands | "default"]?: functionModel
    }
    callback?: {
        [key in string | "default"]?: functionModel
    }
    message?: {
        [key in string | "default"]?: functionModel
    }
}

type functionModel = (client: Client, event: Update) => statesList | Promise<statesList> | void | Promise<void>;

export type statesList = "start" | "default";