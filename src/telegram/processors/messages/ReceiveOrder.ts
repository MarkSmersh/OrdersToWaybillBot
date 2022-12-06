import { Telegram, Message } from "@marksmersh/telegramts";

import { WebAppOrderData } from "../../../../types/order";
import { Order } from "../../../database/models/models";
import { PaymentMethods } from "../../../../types/novaposhta";
import NovaposhtaClient from "../../../novaposhta/client/NovaposhtaClient";

export default async function ReceiveOrderData (client: Telegram, event: Message) {
    if (!event.web_app_data) return
    console.log(event.web_app_data);
    let data = JSON.parse(event.web_app_data.data) as WebAppOrderData;

    await Order.create({
        order: JSON.stringify(
            data.basket.map((b) => {
                return {
                    productId: b.productId,
                    packaging: b.packaging,
                    amount: b.amount
                }
            })
        ),
        orderState: "created",
        phoneNumber: data.phoneNumber.trim(),
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        billingType: data.type.name as PaymentMethods,
        price: data.price,
        destination: (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: data.destination.id as string }))[0].Description,
        destinationRef: data.destination.id.toString(),
        waybill: data.scanSheet,
        createdBy: event.chat.id,
        updatedBy: event.chat.id
    })

    client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order created succesfully" })
}