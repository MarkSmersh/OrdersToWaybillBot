import { Order } from "../../database/models/models";
import NovaposhtaClient from "../../novaposhta/client/NovaposhtaClient";

export default async function ordersToText (orders: Order[]): Promise<string> {
    let ordersMessage = "";

    await new Promise(async (resolve) => {
        console.log(1);
        for (let i = 0; i < orders.length; i++) {
            ordersMessage += `${orders[i].id}: ${orders[i].lastName} ${orders[i].firstName} ${orders[i].middleName}\n${orders[i].price}, `
            let warehouse = (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: orders[i].destination }))[0];
            ordersMessage += `${warehouse.ShortAddress}, №${warehouse.Number}\n\n`;
            if (i + 1 === orders.length) resolve(true);
        }
    })

    return ordersMessage;
}