import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC } from "../../utils/keyboardConstructor";
import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";

export default async function helpMessage(client: Client, event: Message) {
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*Choose with what you need help below:*`,
        reply_markup: IMC(
            [
                IBC({ text: "Show product info", callbackData: "show_product_info" })
            ],
            [
                IBC({ text: "Write to admin", url: `tg://user?id=${process.env.ADMIN_ID as string}`})
            ]
        )
    });
}