import { Message } from "@marksmersh/telegramts"
import { Order } from "../database/models/models"
import NovaposhtaClient from "../novaposhta/NovaposhtaClient"
import { PaymentMethods } from "../types/novaposhta"
import { WebAppOrderData } from "../types/order"

export async function updateOrder (type: "create" | "edit", data: WebAppOrderData, event: Message) {
    if (type === "create") {
        console.log(data);
        return (await Order.upsert({
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
            whoPays: data.whoPays.name,
            price: data.price,
            destination: (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: data.destination.id as string }))[0].Description,
            destinationRef: data.destination.id.toString(),
            waybill: data.scanSheet,
            createdBy: event.chat.id,
            updatedBy: event.chat.id
        }))
    }

    if (type === "edit") {
        console.log(data);
        await Order.update({
            order: JSON.stringify(
                data.basket.map((b) => {
                    return {
                        productId: b.productId,
                        packaging: b.packaging,
                        amount: b.amount
                    }
                })
            ),
            phoneNumber: data.phoneNumber.trim(),
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            billingType: data.type.name as PaymentMethods,
            whoPays: data.whoPays.name,
            price: data.price,
            destination: (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: data.destination.id as string }))[0].Description,
            destinationRef: data.destination.id.toString(),
            updatedBy: event.chat.id
        }, {
            where: { id: data.orderId }
        });
        console.log("lol");
    }

    return undefined;
} 