import { Message } from "../../../../types/telegram";
import { Order } from "../../../database/models/models";
import { Client } from "../../client/client";
import createOrderListButtons from "../../utils/createOrderListButtons";
import { InlineMarkupConstructor } from "../../utils/keyboardConstructor";
import ordersToText from "../../utils/ordersToText";

export default async function OrdersList (client: Client, event: Message) {
    let timePrev = Date.now();
    // let orders = await Order.findAll({ limit: 10 });
    let orders = await Order.findAll({ order: [ [ "id", "DESC" ] ], limit: 10 });
    let ids = await Order.findAll({ attributes: ["id"] });
    console.log(`TIME WASTE: ${Date.now() - timePrev}`)

    let ordersMessage = await ordersToText(orders);
    let replyMarkup = createOrderListButtons(5, orders, ids);

    await client.request("sendMessage", { chat_id: event.chat.id, /*parse_mode: "MarkdownV2",*/
        text: ordersMessage,
        reply_markup: InlineMarkupConstructor(...replyMarkup)
    });
}