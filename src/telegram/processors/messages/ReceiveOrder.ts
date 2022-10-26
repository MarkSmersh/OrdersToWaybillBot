import { Message } from "../../../../types/telegram";
import { Client } from "../../client/client";
import { WebAppOrderData } from "../../../../types/order";

export default async function ReceiveOrderData (client: Client, event: Message) {
    if (!event.web_app_data) return

    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    console.log(data.order[0]);
}