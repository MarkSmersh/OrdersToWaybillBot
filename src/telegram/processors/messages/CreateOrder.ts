import { Client } from "../../client/client";
import { Message } from "../../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC } from "../../utils/keyboardConstructor";
import { StatesList } from "../../utils/stateConfig";
import { queryWebAppConstructor } from "../../utils/queryWebAppConstructor";
import { OrderDataToSend } from "../../utils/dataToSend";
import { ProductInfo } from "../../../../types/order";

export default async function testCommand (client: Client, event: Message) {

    await client.request("sendMessage", { chat_id: event.chat.id, parse_mode: "MarkdownV2",
        text: `*Choose with what you need help below:*`,
        reply_markup: IMC(
            [
                IBC({ text: "Show product info", webApp: { url: "url" } })
            ],
        )
    });
}