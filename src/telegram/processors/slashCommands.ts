import { Client } from "../client/client";
import { Update, SlashCommands } from "../../../types/telegram";
import { InlineButtonConstructor as IBC,
         InlineMarkupConstructor as IMC } from "../utils/keyboardConstructor"

export const SlashCommandsProcessor = (client: Client, event: Update, command: SlashCommands) => {
    let chosenFunc = (() => {
        switch (command) {
            case "/start": return startGreetings;
            case "/help": return helpMessage;
            case "/stop": return stopMessage;
            case "/ping": return pingCalculation;
            default: return unknownCommand;
        }
    })()

    chosenFunc(client, event);
}

async function startGreetings(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, 
        text: "Start had detected", 
        reply_markup: IMC (
            [
                IBC("Test Up", "1"),
            ],
            [
                IBC("Test Left", "2"), IBC("Test Right", "3")
            ],
            [
                IBC("Test Bottom", "4")
            ]
        )
    });
}

async function helpMessage(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id, parse_mode: "MarkdownV2",
        text: `*Greetings*, [${event.message?.chat.first_name}](tg://user?id=${event.message?.chat.id})`});
}

async function stopMessage(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id,
        text: `It is a sad day :(`});
}

async function pingCalculation(client: Client, event: Update) {
    let timeBefore = Date.now();

    let message = await client.request("sendMessage", { chat_id: event.message?.chat.id,
        text: `Ping: calculating...`});

    let timeAfter = Date.now();

    await client.request("editMessageText", { chat_id: event.message?.chat.id, message_id: message.message_id, 
        text: `Ping: ${timeAfter - timeBefore}ms`})
}

async function unknownCommand(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message?.chat.id,
        text: `There\`s no such command. Use Menu to get full list of available commands`});
}