import { Client } from "../client/client";
import { CallbackData, CallbackQuery, Message } from "../../../types/telegram";
import { ProductInfo } from "../../../types/order";
import { Order } from "../../database/models/models";
import { CreateOrder } from "./messages";
import { StatesList } from "../utils/stateConfig";
import { InlineMarkupConstructor as IMC,
         InlineButtonConstructor as IBC } from "../utils/keyboardConstructor";

export async function CallbackAnswer (client: Client, event: CallbackQuery): Promise<void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.id as string, text: `Successfull button processing. Data: ${event.data}`,
        show_alert: true });
}

export async function deleteMessageFromCallback (client: Client, event: CallbackQuery): Promise<void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.id, text: "Message deleted" })
    
    await client.request("deleteMessage", { chat_id: event.message?.chat.id as number,
          message_id: event.message?.message_id.toString() as string
    })
}

export async function typeOrderInfoTable (client: Client, event: CallbackQuery) {
    await client.request("answerCallbackQuery", { callback_query_id: event.id })
    
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: ProductInfo.map((prod) => {
                return `\• *ID*: \`${prod.id}\`\n\\| *Full Name*: \`${prod.fullName}\`\n\• *Short Name*: \`${prod.shortName}\`\n\n`
            }).join('')
    })
}

export async function chooseCountOfProduct (client: Client, event: CallbackQuery): Promise<StatesList | void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.id, text: "Choose product value" })

    let order = await Order.findOne({ where: { orderState: "unready", updatedBy: event.from.id } }) as Order;
    order.order = ProductInfo.find((product) => product.shortName == event.data)?.id.toString() as string;
    await order.save();

    await client.request("editMessageText", { chat_id: event.message?.chat.id,
        message_id: event.message?.message_id as number,
        text: "Choose product value",
        reply_markup: IMC (
            [100, 250, 500, 750, 1000].map((value) => { return IBC({ text: value.toString(), callbackData: ("productValue_" + value.toString()) as CallbackData }) })
        )
    })

    return "product_value_choice"
}

export async function solveUnreadyOrder (client: Client, event: CallbackQuery): Promise<StatesList | void>  {
    let action = event.data?.split("_")[0] as "delete" | "edit";

    let order = await Order.findOne({ where: { orderState: "unready", updatedBy: event.from.id } })

    if (action == "delete") {
        await order?.destroy();
        await client.request("answerCallbackQuery", { callback_query_id: event.id, text: "Order deleted" })

        return (await CreateOrder(client, event.message as Message));
    }

    if (action == "edit") {
        //  
    }
}

export async function createOrderRow (client: Client, event: CallbackQuery): Promise<StatesList | void> {
    let action = event.data?.split("_")[0] as CallbackData;

    if (action == "productValue") {
        let order = await Order.findOne({ where: { orderState: "unready", updatedBy: event.from.id } }) as Order;
        order.order += `x${event.data?.split("_")[1]}_`;
        console.log(event.data);
        console.log(order.order);
        await order.save();

        return (await CreateOrder(client, event.message as Message));
    }
}