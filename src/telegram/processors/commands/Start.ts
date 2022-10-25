import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";
import { ReplyMarkupConstructor as RMC,
         ReplyButtonConstructor as RBC  } from "../../utils/keyboardConstructor";
import { Order } from "../../../database/models/models";
import { StatesList } from "../../utils/stateConfig";

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname + "/../../.env") });

export default async function startGreetings(client: Client, event: Message): Promise<StatesList | void> {
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*Good ${getCurrentTimeString()}*, [${event.chat.first_name}](tg://user?id=${event.chat.id})`});

    if (!process.env.ALLOWED_USERS?.split("_").includes(event.chat.id.toString())) {
        await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
            text: `Oh, seems you are not allowed to use this bot\\. If that error, send this ID: \`${event.chat.id}\` to [him](tg://user?id=562140704)`});
        return;
    }
        
    let createdCount = 0, 
        packagedCount = 0,
        preparedCount = 0,
        sendedCount = 0
        
    let orders = await Order.findAll();
    orders.forEach((order) => {
        switch (order.orderState) {
            case "created": createdCount++; break;
            case "packaged": packagedCount++; break;
            case "prepared": preparedCount++; break;
            case "sended": sendedCount++; break;
        }
    })
    
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*THE LIST OF CURRENT ORDERS*\n
🧾 Created: \`${createdCount}\`
📦 Packaged: \`${packagedCount}\`
📮 Prepared: \`${preparedCount}\`
📨 Sended: \`${sendedCount}\`\n`,
        reply_markup: RMC({ resizeKeyboard: true, oneTimeKeyboard: true },
            [
                RBC({ text: "📝 Create order", webApp: { url: "https://marksmersh1.theweb.place/edit?token=56e0b03444c198d0787b5f127c7133ff&orderData={%20%22data%22:%20[{%20%22name%22:%20%22Amylosubtilin%22,%20%22type%22:%20%22Ferments%22,%20%22packaging%22:%20{%22250%22:105,%20%221000%22:370},%20%22unit%22:%20%22ml%22,%20%22img%22:%20%22https://cdn-icons-png.flaticon.com/512/1748/1748107.png%22%20},%20{%20%22name%22:%20%22Glucavamorin%22,%20%22type%22:%20%22Ferments%22,%20%22packaging%22:%20{%22250%22:105,%20%221000%22:370},%20%22unit%22:%20%22ml%22,%20%22img%22:%20%22https://cdn-icons-png.flaticon.com/512/1748/1748107.png%22%20},%20{%20%22name%22:%20%22Yeast%22,%20%22type%22:%20%22Yeasts%22,%20%22packaging%22:%20{%20%22100%22:140,%20%22250%22:350,%20%22500%22:600,%20%221000%22:1200%20},%20%22unit%22:%20%22g%22,%20%22img%22:%20%22https://cdn-icons-png.flaticon.com/512/6411/6411176.png%22%20}],%20%22basket%22:%20[{%22id%22:%200,%20%22packaging%22:%20250,%20%22amount%22:%205%20},%20{%22id%22:%202,%20%22packaging%22:%201000,%20%22amount%22:%203}],%20%22price%22:%20%22300%22%20}&costumerData={%22phoneNumber%22:%20%22+38123456789%22,%20%22lastName%22:%20%22%22,%20%22firstName%22:%20%22Ivan%22,%20%22middleName%22:%20%22Ivanovich%22%20}&mailData={%22settlement%22:%20{%20%22data%22:%20[],%20%22selected%22:%20%220d888ccf-4b3a-11e4-ab6d-005056801329%22%20},%20%22destination%22:%20{%22data%22:%20[],%20%22selected%22:%20%221ec09d88-e1c2-11e3-8c4a-0050568002cf%22}}&billingData={%22type%22:%20{%22data%22:%20[%22Cash%22,%20%22Noncash%22],%20%22selected%22:%200},%20%22whoPays%22:%20{%22data%22:%20[%22Sender%22,%20%22Recipient%22],%20%22selected%22:%200}%20}" }})
            ],
            [
                RBC({ text: "📦 Select packaged" }), RBC({ text: "📮 Create waybills" })
            ],
            [
                RBC({ text: "📑 Orders list" })
            ]
        )
    });

    return "menu";
}

function getCurrentTimeString () {
    let data = new Date();
    let hour = data.getUTCHours() + 3;
    (hour > 24) ? hour - 24 : hour

    if (hour < 6) return "night 🌚";
    if (hour < 12) return "morning 🌞";
    if (hour < 18) return "afternoon 🌝";
    if (hour < 24) return "evening 🌛";
}