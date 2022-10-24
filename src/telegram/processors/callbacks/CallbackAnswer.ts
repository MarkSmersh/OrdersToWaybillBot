import { CallbackQuery } from "../../../../types/telegram";
import { Client } from "../../client/client";

export default async function CallbackAnswer (client: Client, event: CallbackQuery): Promise<void> {
    await client.request("answerCallbackQuery", { callback_query_id: event.id as string, text: `Successfull button processing. Data: ${event.data}`,
        show_alert: true });
}