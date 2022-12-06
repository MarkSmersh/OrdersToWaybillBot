import { Telegram, CallbackQuery, InlineMarkup } from "@marksmersh/telegramts";

import { Op } from "sequelize";
import { Order } from "../../../database/models/models";
import createOrderListButtons from "../../utils/createOrderListButtons";
import ordersToText from "../../utils/ordersToText";

export default async function OrdersListNav(client: Telegram, event: CallbackQuery): Promise<string> {
    let orders = await Order.findAll({ where: { id: { [Op.gt]: event.data } }, limit: 10 })
    let ids = await Order.findAll({ attributes: ["id"] });

    let ordersMessage = await ordersToText(orders);
    let replyMarkup = createOrderListButtons(5, 10, orders, ids);

    await client.request("editMessageText", { chat_id: event.from.id, message_id: event.message?.message_id as number, /*parse_mode: "MarkdownV2",*/
        text: ordersMessage,
        reply_markup: InlineMarkup(...replyMarkup)
    });

    return "order_nav";
}