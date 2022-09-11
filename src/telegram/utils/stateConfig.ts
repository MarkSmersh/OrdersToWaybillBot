import { startGreetings, helpMessage, pingCalculation, unknownCommand } from "../processors/commands";
import { EventModel } from "./stateFilter";

import { CallbackAnswer } from "../processors/callbacks";
import { MessageEcho } from "../processors/messages";

export const stateConfig: Record<string, EventModel[]> = {
    default: [
        {
            type: "command",
            data: "/start",
            function: startGreetings
        },
        {
            type: "command",
            data: "/help",
            function: helpMessage
        },
        {
            type: "command",
            data: "/ping",
            function: pingCalculation
        },
        {
            type: "command",
            data: "default",
            function: unknownCommand
        }
    ],
    start: [
        {
            type: "callback",
            data: "default",
            function: CallbackAnswer
        },
        {
            type: "message",
            data: "default",
            function: MessageEcho
        }
    ]
}