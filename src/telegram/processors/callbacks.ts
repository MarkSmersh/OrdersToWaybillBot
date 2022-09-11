import { Client } from "../client/client";
import { Update } from "../../../types/telegram";

export async function CallbackAnswer (client: Client, event: Update): Promise<void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.callback_query?.id as string, text: `Successfull button processing. Data: ${event.callback_query.data}`,
        show_alert: true });
}