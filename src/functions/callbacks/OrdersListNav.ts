import { Telegram, CallbackQuery, InlineMarkup } from "@marksmersh/telegramts";

import { Op } from "sequelize";
import { OrderData } from "..";
import { Order } from "../../database/models/models";
import createOrderListButtons from "../../utils/createOrderListButtons";
import ordersToText from "../../utils/ordersToText";

export default async function OrdersNav(client: Telegram, event: CallbackQuery): Promise<string> {
    const data = event.data;

    if (data?.split("_").includes("step") || data?.split("_").includes("return")) {
        return (await ListNav(client, event));
    }

    if (data?.split("_").includes("id")) {
        return (await OrderData(client, event))
    }

    return "order_nav";
}

export async function ListNav (client: Telegram, event: CallbackQuery): Promise<string> {
    const data = event.data?.split("_") as string[];
    
    let orders = await Order.findAll({ where: { id: { [Op.lte]: data[1]   }}, order: [ [ "id", "DESC" ] ], limit: 10 })
    let ids = await Order.findAll({ attributes: ["id"] });

    let ordersMessage = ordersToText(orders);
    let replyMarkup = createOrderListButtons(5, 10, orders, ids);

    await client.request("editMessageText", { chat_id: event.from.id, message_id: event.message?.message_id as number, /*parse_mode: "MarkdownV2",*/
        text: ordersMessage,
        reply_markup: InlineMarkup(...replyMarkup)
    });

    return "order_nav";
}