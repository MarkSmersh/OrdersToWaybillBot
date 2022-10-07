import { Client } from "../client/client";
import { Message } from "../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC } from "../utils/keyboardConstructor";
import { ProductInfo } from "../../../types/order";
import { InlineKeyboardButton } from "../../../types/telegram";
import { StatesList } from "../utils/stateConfig";
import { Order, UserState } from "../../database/models/models";

export async function CreateOrder (client: Client, event: Message): Promise<StatesList | void> {
    
    let order: Order;

    console.log((await UserState.findOne({ where: { user_id: event.chat.id }}))?.state == "menu");

    if ((await UserState.findOne({ where: { user_id: event.chat.id }}))?.state == "menu") { 
        order = await Order.create({ orderState: "unready",
        createdBy: event.chat.id,
        updatedBy: event.chat.id })
    } else {
        order = await Order.findOne({ where: { orderState: "unready" } }) as Order
    }

    console.log(order);

    // if ((await Order.findOne({ where: { orderState: "unready", updatedBy: event.chat.id }})) !== null) {
    //     await client.request("sendMessage", { chat_id: event.chat.id,
    //         text: "You have currently unready order. Choose option below:",
    //         reply_markup: IMC (
    //             [
    //                 IBC({ text: "Delete unready order", callbackData: "delete_unready" })
    //             ],
    //             [
    //                 IBC({ text: "Edit unready order", callbackData: "edit_unready" })
    //             ]
    //         )
    //     })
    //     return "unready_order";
    // };

    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2", // I really want to change it with web app, but not today
        text: `*Here is order*:`
    })

    let orderList = order.order?.split("_").map( //1x100_
        (product) => { 
            console.log(product)
            let prodAndValue = product.split("x");
            return `${ProductInfo.find((prod) => prod.shortName == prodAndValue[0])?.fullName} (${prodAndValue[1]}\n) `
        })

    await client.request("sendMessage", { chat_id: event.chat.id, // I really want to change it with web app, but not today
        text: `Products in order:\n\n${(orderList != undefined) ? orderList : "Add some products:"}`,
        reply_markup: IMC(
            ...productToInlineButtons(4)
        )
    })

    console.log(productToInlineButtons(4));

    return "product_choice";
}

function productToInlineButtons (onRow: number): InlineKeyboardButton[][] {
    let productLength = ProductInfo.length;
    let result: InlineKeyboardButton[][] = [[]];
    result.length = 0;
    let pushCounter = 0;
    for (let i = 0; i < Math.ceil(productLength / onRow); i++) {
        let buttonArray: InlineKeyboardButton[] = [];
        let less = ((productLength - pushCounter < onRow) ? productLength - pushCounter : onRow)
        for (let index = 0; index < less; index++) { // 7
            let current = ProductInfo[pushCounter]
            buttonArray.push({ text: current.shortName, callback_data: current.shortName })
            pushCounter++;
        }
        result.push(buttonArray);
    }
    return result;
}