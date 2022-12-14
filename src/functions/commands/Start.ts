import { Telegram, Message, ReplyMarkup, ReplyButton } from "@marksmersh/telegramts";

import { Order } from "../../database/models/models";
import { queryWebAppConstructor } from "../../utils/queryWebAppConstructor";
import { OrderDataToSend } from "../../utils/dataToSend";
import { ProductInfo } from "../../types/order";

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname + "/../../.env") });

export default async function startGreetings(client: Telegram, event: Message): Promise<string | void> {    
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
            // case "prepared": preparedCount++; break;
            case "sended": sendedCount++; break;
        }
    })

    let props = queryWebAppConstructor("create", {
        // token: process.env.NV_TOKEN,
        orderData: {
            data: OrderDataToSend(ProductInfo)
        }
    })
    
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*THE LIST OF CURRENT ORDERS*\n
๐งพ Created: \`${createdCount}\`
๐ฆ Packaged: \`${packagedCount}\`
๐ฎ Prepared: \`${preparedCount}\`
๐จ Sended: \`${sendedCount}\`\n`,
        reply_markup: ReplyMarkup({ resizeKeyboard: true, oneTimeKeyboard: true },
            [
                ReplyButton({ text: "๐ Create order", webApp: { url: `${process.env.WEBAPP}${props}` }})
            ],
            [
                ReplyButton({ text: "๐ฆ Select packaged" }), ReplyButton({ text: "๐ฎ Create waybills" })
            ],
            [
                ReplyButton({ text: "๐ Orders list" })
            ]
        )
    });

    return "menu";
}

function getCurrentTimeString () {
    let data = new Date();
    let hour = data.getUTCHours() + 2;
    (hour >= 24) ? hour -= 24 : hour;

    if (hour < 6) return "night ๐";
    if (hour < 12) return "morning ๐";
    if (hour < 18) return "afternoon ๐";
    if (hour < 24) return "evening ๐";
}