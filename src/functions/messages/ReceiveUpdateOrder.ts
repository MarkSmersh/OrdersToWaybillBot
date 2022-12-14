import { Message, Telegram } from "@marksmersh/telegramts";
import { Order } from "../../database/models/models";
import { WebAppOrderData } from "../../types/order";
import { updateOrder } from "../../utils/updateOrder";
import { updateWaybill } from "../../utils/updateWaybill";

export default async function ReceiveUpdateOrder (client: Telegram, event: Message) {
    if (!event.web_app_data) return;
    
    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    await updateOrder("edit", data, event);

    const order = await Order.findByPk(data.orderId);


    if (order?.waybill !== null) {
        await updateWaybill(data.orderId.toString());
    }

    await client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order updated succesfully" })
} 