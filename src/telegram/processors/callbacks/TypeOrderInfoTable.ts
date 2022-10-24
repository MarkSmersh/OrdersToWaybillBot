import { Client } from "../../client/client";
import { CallbackQuery } from "../../../../types/telegram";
import { ProductInfo } from "../../../../types/order";

export default async function typeOrderInfoTable (client: Client, event: CallbackQuery) {
    await client.request("answerCallbackQuery", { callback_query_id: event.id })
    
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: ProductInfo.map((prod) => {
                return `\• *ID*: \`${prod.id}\`\n\\| *Full Name*: \`${prod.fullName}\`\n\• *Short Name*: \`${prod.shortName}\`\n\n`
            }).join('')
    })
}