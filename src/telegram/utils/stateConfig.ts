import * as f from "../processors/index"
import { EventModel } from "./stateFilter";

export const stateConfig: Record<StatesList, EventModel[]> = {
    "default": [
        {
            type: "command",
            data: "/start",
            function: f.Start
        },
        {
            type: "command",
            data: "/help",
            function: f.Help
        },
        {
            type: "command",
            data: "/ping",
            function: f.Ping
        },
        {
            type: "command",
            data: "default",
            function: f.Unknown
        },
        {
            type: "callback",
            data: "show_product_info",
            function: f.TypeOrderInfoTable
        }
    ],
    "menu": [
        {
            type: "message",
            data: "📝 Create order",
            function: f.CreateOrder
        }
    ],
}

export type StatesList = "default" | "menu";