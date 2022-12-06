import { Telegram, Message, InlineMarkup, InlineButton } from "@marksmersh/telegramts";


export default async function helpMessage(client: Telegram, event: Message) {
    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*Choose with what you need help below:*`,
        reply_markup: InlineMarkup(
            [
                InlineButton({ text: "Show product info", callbackData: "show_product_info" })
            ],
            [
                InlineButton({ text: "Write to admin", url: `tg://user?id=${process.env.ADMIN_ID as string}`})
            ]
        )
    });
}