import { InlineKeyboardButton } from "@marksmersh/telegramts/src/types/requests";
import { Order } from "../database/models/models";

export default function createOrderListButtons (onRow: number, step: number, orders: Order[], ids: Order[]) {
    let productLength = orders.length;
    let result: InlineKeyboardButton[][] = [[]];
    result.length = 0;
    let pushCounter = 0;

    // creating n ceils per stroke
    for (let i = 0; i < Math.ceil(productLength / onRow); i++) {
        let buttonArray: InlineKeyboardButton[] = [];
        let less = ((productLength - pushCounter < onRow) ? productLength - pushCounter : onRow)
        for (let index = 0; index < less; index++) { // 7
            let current = orders[pushCounter]
            buttonArray.push({ text: current.id.toString(), callback_data: "id_" +  current.id.toString() })
            pushCounter++;
        }
        result.push(buttonArray);
    }

    let navButtons: InlineKeyboardButton[] = [];

    let ordersIds = orders.map((o) => { return o.id });
    let allIds = ids.map((o) => { return o.id });

    if (allIds.includes(Math.max(...ordersIds) + 1)) {
        navButtons.push({ text: "<", callback_data: "step_" + (ordersIds.at(0) as number + step).toString() }) //
    }

    if (allIds.includes(Math.min(...ordersIds) - 1)) {
        navButtons.push({ text: ">", callback_data: "step_" + (ordersIds.at(-1) as number - 1).toString() }) //
    }

    if (navButtons.length !== 0) result.push(navButtons);

    console.log(result);

    return result;
}