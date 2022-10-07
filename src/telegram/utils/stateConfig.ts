import { type } from "os";
import { chooseCountOfProduct, createOrderRow, deleteMessageFromCallback, solveUnreadyOrder, typeOrderInfoTable } from "../processors/callbacks";
import { startGreetings, helpMessage, pingCalculation, unknownCommand } from "../processors/commands";
import { CreateOrder } from "../processors/messages";
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
        },
        {
            type: "callback",
            data: "delete_message",
            function: deleteMessageFromCallback
        },
        {
            type: "callback",
            data: "show_product_info",
            function: typeOrderInfoTable
        }
    ],
    "menu": [
        {
            type: "message",
            data: "📝 Create order",
            function: CreateOrder
        }
    ],
    "product_choice": [
        {
            type: "callback",
            data: "default",
            function: chooseCountOfProduct
        }
    ],
    "unready_order": [
        {
            type: "callback",
            data: "delete_unready",
            function: solveUnreadyOrder
        },
        {
            type: "callback",
            data: "edit_unready",
            function: solveUnreadyOrder
        }
    ],
    "product_value_choice": [
        {
            type: "callback",
            data: "default",
            function: createOrderRow
        }
    ],
    "add_product": [
        {
            type: "callback",
            data: "default",
            function: createOrderRow
        }
    ]
}

export type StatesList = "default" | "menu" | "product_choice" | "unready_order" | "product_value_choice" | "add_product";