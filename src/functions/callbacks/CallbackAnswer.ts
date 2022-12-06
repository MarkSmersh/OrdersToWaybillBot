import { Telegram, CallbackQuery } from "@marksmersh/telegramts";

export default async function CallbackAnswer (client: Telegram, event: CallbackQuery): Promise<void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.id as string, text: `Successfull button processing. Data: ${event.data}`,
        show_alert: true });
}