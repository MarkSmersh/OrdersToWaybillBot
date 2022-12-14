import { Telegram, CallbackQuery, InlineMarkup, InlineButton, Escape, ReplyMarkup, ReplyButton } from "@marksmersh/telegramts";
import { Order } from "../../database/models/models";
import NovaposhtaClient from "../../novaposhta/NovaposhtaClient";
import { OrderData, ProductInfo } from "../../types/order";
import { OrderDataToSend } from "../../utils/dataToSend";
import { queryWebAppConstructor } from "../../utils/queryWebAppConstructor";

export default async function OrderData (client: Telegram, event: CallbackQuery): Promise<string> {
    const data = event.data?.split("_")[1];

    const order = await Order.findOne({ where: { id: data } }) as Order;

    const orderText = (JSON.parse(order.order) as OrderData[]).map((o) => {
        const product = ProductInfo.find((p) => p.id === o.productId);
        return `${product?.fullName}: ${o.packaging}, ${o.amount};\n`
    });
    const text = `
*Contact info*: ${order.lastName} ${order.firstName} ${order.middleName}, \`${Escape(order.phoneNumber)}\`
${Escape(order.destination)}
*Order*: ${orderText}
*Price*: ${order.price}UAH
*Billing*: pay ${order.whoPays} as ${order.billingType}
*Waybill*: ${order.waybill}\n
\`Last time updated by ${order.updatedBy} at ${Escape(order.updatedAt.toLocaleDateString())} \\(${Escape(order.updatedAt.toLocaleTimeString())}\\)\``

    const props = queryWebAppConstructor("edit", {
        orderId: order.id,
        orderData: {
            data: OrderDataToSend(ProductInfo),
            basket: (JSON.parse(order.order) as OrderData[]).map((o) => { return { id: o.productId, packaging: o.packaging, amount: o.amount } }),
            price: order.price
        },
        costumerData: {
            phoneNumber: order.phoneNumber,
            lastName: order.lastName,
            firstName: order.firstName,
            middleName: order.middleName
        },
        mailData: {
            settlement: {
                selected: (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: order.destinationRef }))[0].SettlementRef,
                data: []
            },
            destination: {
                selected: order.destinationRef,
                data: []
            },
            scanSheet: order.waybill
        },
        billingData: {
            type: {
                selected: order.billingType,
                data: ["Cash", "Noncash"]
            },
            whoPays: {
                selected: order.whoPays,
                data: ["Sender", "Recipient"]
            }
        }
    })

    const replyMarkup = [[
        InlineButton({ text: "Mark as packaged", callbackData: `packaged_${order.id}` }), InlineButton({ text: "Mark as sent", callbackData: `sent_${order.id}` })
    ], [
        InlineButton({ text: "Return", callbackData: `return_${order.id}`})
    ]]

    if (order.waybill === null) {
        replyMarkup.push([
            InlineButton({ text: "Create waybill", callbackData: `waybill_${order.id}` })
        ])
    }

    const webAppMarkup = ReplyMarkup({ resizeKeyboard: true }, [
        ReplyButton({ text: "Edit order",  webApp: { url: `${process.env.WEBAPP}${props}` } })
    ])

    await client.request("editMessageText", { chat_id: event.from.id,
        message_id: event.message?.message_id as number,
        text: text,
        parse_mode: "MarkdownV2",
        reply_markup: InlineMarkup(...replyMarkup)
    })

    await client.request("sendMessage", { chat_id: event.from.id,
        text: `*Order ID: ${order.id}*`,
        parse_mode: "MarkdownV2",
        reply_markup: webAppMarkup })

    return "order_data"
}