import { Message } from "../../../../types/telegram";
import { Client } from "../../client/client";
import { WebAppOrderData } from "../../../../types/order";
import { Order } from "../../../database/models/models";
import { PaymentMethods } from "../../../../types/novaposhta";

export default async function ReceiveOrderData (client: Client, event: Message) {
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
        destination: data.destination.id as string,
        waybill: data.scanSheet,
        createdBy: event.chat.id,
        updatedBy: event.chat.id
    })

    client.request("sendMessage", { chat_id: event.chat.id,
        text: "Order created succesfully" })
}