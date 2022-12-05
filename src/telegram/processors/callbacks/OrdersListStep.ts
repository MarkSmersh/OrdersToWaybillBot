import { Op } from "sequelize";
import { CallbackQuery } from "../../../../types/telegram";
import { Order } from "../../../database/models/models";
import { Client } from "../../client/client";
import { StatesList } from "../../state/stateConfig";
import createOrderListButtons from "../../utils/createOrderListButtons";
import { InlineMarkupConstructor } from "../../utils/keyboardConstructor";
import ordersToText from "../../utils/ordersToText";

export default async function OrdersListNav(client: Client, event: CallbackQuery): Promise<StatesList> {
    let orders = await Order.findAll({ where: { id: { [Op.gt]: event.data } }, limit: 10 })
    let ids = await Order.findAll({ attributes: ["id"] });

    let ordersMessage = await ordersToText(orders);
    let replyMarkup = createOrderListButtons(5, 10, orders, ids);

    await client.request("editMessageText", { chat_id: event.from.id, message_id: event.message?.message_id as number, /*parse_mode: "MarkdownV2",*/
        text: ordersMessage,
        reply_markup: InlineMarkupConstructor(...replyMarkup)
    });

    return "order_nav";
}