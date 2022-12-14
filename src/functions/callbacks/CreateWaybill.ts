import { CallbackQuery, Telegram } from "@marksmersh/telegramts";
import { updateWaybill } from "../../utils/updateWaybill";

export default async function CreateWaybill (client: Telegram, event: CallbackQuery) {
    const waybill = await updateWaybill(event.data as string);

    if (waybill) {
        await client.request("sendMessage", { chat_id: event.from.id,
            text: `Waybill created succesfull\\.\nCurrent waybill for order is \`${waybill}\``,
            parse_mode: "MarkdownV2"
        })
    }
} 