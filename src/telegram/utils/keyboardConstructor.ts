import { InlineKeyboardButton, InlineKeyboardMarkup, 
         ReplyKeyboardButton, ReplyKeyboardMarkup,
         ReplyKeyboardRemove, ForceReply,
         LoginUrl, MessageData} from "../../../types/telegram";
import { CallbackData } from "../../../types/telegram";

export function InlineMarkupConstructor (...inlineButtons: InlineKeyboardButton[][]): string {
    let inlineKeyboard: InlineKeyboardMarkup = {
        inline_keyboard: inlineButtons
    }
    return JSON.stringify(inlineKeyboard);
}

export function InlineButtonConstructor (config: { text: string, callbackData?: CallbackData, url?: string, loginUrl?: LoginUrl }): InlineKeyboardButton {
    return {
        text: config.text,
        callback_data: config.callbackData,
        url: config.url
    }
}

export function ReplyMarkupConstructor (config: { resizeKeyboard?: boolean, oneTimeKeyboard?: boolean, inputFieldPlaceholder?: string, selective?: boolean }, ...replyButtons: ReplyKeyboardButton[][]): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let replyKeyboard: ReplyKeyboardMarkup = {
        keyboard: replyButtons,
        resize_keyboard: config.resizeKeyboard,
        one_time_keyboard: config.oneTimeKeyboard,
        input_field_placeholder: config.inputFieldPlaceholder,
        selective: config.selective
    }
    return JSON.stringify(replyKeyboard);
}

export function ReplyButtonConstructor (config: { text: MessageData, requestContact?: boolean, requestLocation?: boolean }): ReplyKeyboardButton {
    return {
        text: config.text,
        request_contact: config.requestContact,
        request_location: config.requestLocation
    }
}

export function ReplyRemoveConstructor (config: { selective?: boolean }): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let replyRemove: ReplyKeyboardRemove = {
        remove_keyboard: true,
        selective: config.selective
    }
    return JSON.stringify(replyRemove);
}

export function ForceReplyConstructor (config: { inputFieldPlaceholder?: string, selective?: boolean }): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let forceReply: ForceReply = {
        force_reply: true,
        input_field_placeholder: config.inputFieldPlaceholder,
        selective: config.selective
    }
    return JSON.stringify(forceReply);
}