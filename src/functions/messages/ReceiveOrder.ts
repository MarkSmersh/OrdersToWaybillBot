import { Telegram, Message } from "@marksmersh/telegramts";
import { WebAppOrderData } from "../../types/order";
import { updateOrder } from "../../utils/updateOrder";

export default async function ReceiveOrderData (client: Telegram, event: Message) {
    console.log(event);
    if (!event.web_app_data) return
    console.log(event.web_app_data);
    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    await updateOrder("create", data, event);

    client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order created succesfully" })
}