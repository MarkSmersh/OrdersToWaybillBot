import { Telegram, Message, InlineMarkup, InlineButton } from "@marksmersh/telegramts";

export default async function testCommand (client: Telegram, event: Message) {

    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*Choose with what you need help below:*`,
        reply_markup: InlineMarkup(
            [
                InlineButton({ text: "Show product info", webApp: { url: "url" } })
            ],
        )
    });
}