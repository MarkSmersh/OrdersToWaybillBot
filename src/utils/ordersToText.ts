import { Order } from "../database/models/models";

export default function ordersToText (orders: Order[]): string {
    let ordersMessage = "";

    for (let i = 0; i < orders.length; i++) {
        ordersMessage += `${orders[i].id}: ${orders[i].lastName} ${orders[i].firstName} ${orders[i].middleName}\n${orders[i].price},\n${orders[i].destination}\n\n`
    }

    return ordersMessage;
}