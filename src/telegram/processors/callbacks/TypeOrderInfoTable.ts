import { Telegram, CallbackQuery } from "@marksmersh/telegramts";

import { ProductInfo } from "../../../../types/order";

export default async function typeOrderInfoTable (client: Telegram, event: CallbackQuery) {
    await client.request("answerCallbackQuery", { callback_query_id: event.id })
    
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: ProductInfo.map((prod) => {
                return `*ID*: \`${prod.id}\`\n*Short Name*: \`${prod.shortName}\`\n*Packaging:*\n${prod.packaging.map((v) => { return `\`${v.value}\`${prod.unit}: \`${v.price}\`₴\n` }).join('')}\n`
            }).join('')
    })
}