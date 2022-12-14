import { Telegram, States } from "@marksmersh/telegramts";
import * as f from "./functions/index";

import database from "./database/database";
import { UserState } from "./database/models/models";
import { updateCounterparties, updateCounterpartiesContactPersons } from "./utils/updateFromServer";

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const t = new Telegram({
    token: process.env.TOKEN as string,
    state: new States({
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
            },
        ],
        "menu": [
            {
                type: "message",
                data: "📝 Create order",
                function: f.CreateOrder
            },
            {
                type: "message",
                data: "📑 Orders list",
                function: f.OrdersList
            },
            {
                type: "message",
                data: "default",
                function: f.ReceiveOrderData
            }
        ],
        "order_nav": [
            {
                type: "callback",
                data: "default",
                function: f.OrderListStep
            }
        ],
        "order_data": [
            {
                type: "callback",
                data: "default",
                function: f.OrderState
            },
            {
                type: "message",
                data: "default",
                function: f.ReceiveUpdateOrder
            }
        ]
    }, {
        onStateUpdate: onStateUpdate
    })
});

async function onStateUpdate (newState: string, id: number) {
    await UserState.upsert({ user_id: id, state: newState });
}

t.once("load", async () => {
    await database.sync();
    await database.authenticate();

    let states = await UserState.findAll();

    t.State?.set(
        states.map((s) => { return { id: s.user_id, state: s.state } })
    )

    // await updateCounterparties();
    // await updateCounterpartiesContactPersons();

    // setInterval(() => updateCounterparties(), 86400000);
    // setInterval(() => updateCounterpartiesContactPersons(), 86400000);

    t.start();
})

t.once("start", async (e) => {
    console.log(`Bot ${e.first_name} has started!`);
});

t.load();