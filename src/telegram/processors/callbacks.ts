import { Client } from "../client/client";
import { Update } from "../../../types/telegram";

export const CallbacksProcessor = (client: Client, event: Update) => {
    client.request("answerCallbackQuery", { callback_query_id: event.callback_query?.id as string, text: "Successfull button processing",
            show_alert: true });
    return;
}