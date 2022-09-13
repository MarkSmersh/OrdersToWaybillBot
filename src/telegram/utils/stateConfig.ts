import { startGreetings, helpMessage, pingCalculation, unknownCommand } from "../processors/commands";
import { EventModel } from "./stateFilter";

export const stateConfig: Record<StatesList, EventModel[]> = {
    "default": [
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
    ]
}

export type StatesList = "default";