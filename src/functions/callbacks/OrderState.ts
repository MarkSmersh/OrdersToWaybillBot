import { CallbackQuery, Telegram } from "@marksmersh/telegramts";
import { Order } from "../../database/models/models";
import { updateWaybill } from "../../utils/updateWaybill";
import CreateWaybill from "./CreateWaybill";
import { ListNav } from "./OrdersListNav";

export default async function OrderState (client: Telegram, event: CallbackQuery) {
    await client.request("answerCallbackQuery", { callback_query_id: event.id });
    
    const data = event.data?.split("_") as Array<string>; 
    let text: string = "";

    if (data[0] === "return") {
        return (await ListNav(client, event));
    }

    if (data[0] === "waybill") {
        event.data = data[1];
        return (await CreateWaybill(client, event));
    }

    if (data[0] === "packaged") {
        await Order.update({ orderState: "packaged" }, { where: { id: data[1] } });
        text = "packaged";
    }

    if (data[0] === "sent") {
        await Order.update({ orderState: "sended" }, { where: { id: data[1] } });
        text = "sent";
    }

    if (text !== "") {
        client.request("sendMessage", { chat_id: event.from.id,
            text: `Order \`${data[1]}\` state changed to \`${text}\``,
            parse_mode: "MarkdownV2"})
    }
}