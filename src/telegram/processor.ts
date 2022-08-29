import { Update } from "../../types/telegram";
import { Client } from "./client/client";

type SlashCommands = "/start" | "/help" | "/ping" | "/stop";

export = (client: Client, event: Update): void => {
    event.message.entities?.forEach((messageEntity) => {
        if (messageEntity.type == "bot_command") {
            let command = event.message.text?.split(" ").find((word) => word.startsWith("/")) as SlashCommands;
            SlashCommandsProcessor(client, event, command);
            return;
        }
    })
}

const SlashCommandsProcessor = (client: Client, event: Update, command: SlashCommands) => {
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
    await client.request("sendMessage", { chat_id: event.message.chat.id, 
        text: "Start had detected"});
}

async function helpMessage(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message.chat.id, parse_mode: "MarkdownV2",
        text: `*Greetings*, [${event.message.chat.first_name}](tg://user?id=${event.message.chat.id})`});
}

async function stopMessage(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message.chat.id,
        text: `It is a sad day :(`});
}

async function pingCalculation(client: Client, event: Update) {
    let timeBefore = Date.now();

    let message = await client.request("sendMessage", { chat_id: event.message.chat.id,
        text: `Ping: calculating...`});

    let timeAfter = Date.now();

    await client.request("editMessageText", { chat_id: event.message.chat.id, message_id: message.message_id, 
        text: `Ping: ${timeAfter - timeBefore}ms`})
}

async function unknownCommand(client: Client, event: Update) {
    await client.request("sendMessage", { chat_id: event.message.chat.id,
        text: `There\`s no such command. Use Menu to get full list of available commands`});
}