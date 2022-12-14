import { Message, Telegram } from "@marksmersh/telegramts";
import { WebAppOrderData } from "../../types/order";
import { updateOrder } from "../../utils/updateOrder";

export default async function ReceiveUpdateOrder (client: Telegram, event: Message) {
    if (!event.web_app_data) return;
    // console.log(event.web_app_data);
    // console.log(event);
    console.log("test");
    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    console.log(await updateOrder("edit", data, event));

    await client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order updated succesfully" })
} 