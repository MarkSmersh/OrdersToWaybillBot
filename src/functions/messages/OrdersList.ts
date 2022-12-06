import { Telegram, Message, InlineMarkup } from "@marksmersh/telegramts";

import { Order } from "../../database/models/models";
import createOrderListButtons from "../../utils/createOrderListButtons";
import ordersToText from "../../utils/ordersToText";

export default async function OrdersList (client: Telegram, event: Message): Promise<string> {
    let timePrev = Date.now();
    // let orders = await Order.findAll({ limit: 10 });
    let orders = await Order.findAll({ order: [ [ "id", "DESC" ] ], limit: 10 });
    console.log(orders);
    let ids = await Order.findAll({ attributes: ["id"] });
    console.log(`TIME WASTE: ${Date.now() - timePrev}`)

    let ordersMessage = ordersToText(orders);
    let replyMarkup = createOrderListButtons(5, 10, orders, ids);

    await client.request("sendMessage", { chat_id: event.chat.id, /*parse_mode: "MarkdownV2",*/
        text: ordersMessage,
        reply_markup: InlineMarkup(...replyMarkup)
    });

    return "order_nav";
}