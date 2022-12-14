import { Telegram, Message, InlineMarkup, InlineButton } from "@marksmersh/telegramts";
import { Order } from "sequelize";
import { WebAppOrderData } from "../../types/order";
import { updateOrder } from "../../utils/updateOrder";

export default async function ReceiveOrderData (client: Telegram, event: Message) {
    if (!event.web_app_data) return
    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    const order = await updateOrder("create", data, event);

    client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order created succesfully",
        reply_markup: InlineMarkup([
            InlineButton({ text: "Create waybill", callbackData: order?.id.toString() })
        ])
    })
}