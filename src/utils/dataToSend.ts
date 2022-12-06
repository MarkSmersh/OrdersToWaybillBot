import { ProductInfo, QueryCreate } from "../types/order";

export function OrderDataToSend(data: typeof ProductInfo): QueryCreate["orderData"] {
    let order = [] as unknown as QueryCreate["orderData"]["data"];
    
    data.forEach((d) => {
        order.push({
            name: d.fullName,
            type: d.type,
            packaging: (() => {
                let pack = {} as {[x in number]: number}

                d.packaging.forEach((p) => {
                    pack[p.value] = p.price
                })

                return pack;
            })(),
            unit: d.unit,
            img: d.img
        })
    })

    return {
        data: order
    };
}