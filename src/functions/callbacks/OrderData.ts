import { Telegram, CallbackQuery, InlineMarkup, InlineButton, Escape } from "@marksmersh/telegramts";
import { Order } from "../../database/models/models";
import { OrderData, ProductInfo } from "../../types/order";

export default async function CallbackAnswer (client: Telegram, event: CallbackQuery): Promise<string> {
    const data = event.data?.split("_")[1];

    const order = await Order.findOne({ where: { id: data } }) as Order;

    const orderText = (JSON.parse(order.order) as OrderData[]).map((o) => {
        const product = ProductInfo.find((p) => p.id === o.productId);
        return `${product?.fullName}: ${o.packaging}, ${o.amount};\n`
    });
    const text = `*Order ID: ${order.id}*\n
*Contact info*: ${order.lastName} ${order.firstName} ${order.middleName}, \`${Escape(order.phoneNumber)}\`
${Escape(order.destination)}
*Order*: ${orderText}
*Price*: ${order.price}UAH
*Billing*: pay ${order.whoPays} as ${order.billingType}
*Waybill*: ${order.waybill}\n
\`Last time updated by ${order.updatedBy} at ${Escape(order.updatedAt.toLocaleDateString())} \\(${Escape(order.updatedAt.toLocaleTimeString())}\\)\``

    

    const replyMarkup = InlineMarkup([
        InlineButton({ text: "Mark as packaged", callbackData: "packaged" }), InlineButton({ text: "Mark as sent", callbackData: "sent" })
    ], [            
        InlineButton({ text: "Edit order", webApp: { url: `${process.env.WEBAPP}` } })
    ])


    client.request("sendMessage", { chat_id: event.from.id,
        text: text,
        parse_mode: "MarkdownV2",
        reply_markup: replyMarkup
    })

    return "order_data"
}