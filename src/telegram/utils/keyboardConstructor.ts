import { InlineKeyboardButton, InlineKeyboardMarkup, 
         ReplyKeyboardButton, ReplyKeyboardMarkup,
         ReplyKeyboardRemove, ForceReply,
         LoginUrl } from "../../../types/telegram";
import { CallbackData } from "../../../types/telegram";

export function InlineMarkupConstructor (...inlineButtons: InlineKeyboardButton[][]): string {
    let inlineKeyboard: InlineKeyboardMarkup = {
        inline_keyboard: inlineButtons
    }
    return JSON.stringify(inlineKeyboard);
}

export function InlineButtonConstructor (text: string, callbackData: CallbackData, url?: string, loginUrl?: LoginUrl): InlineKeyboardButton {
    return {
        text: text,
        callback_data: callbackData,
        url: url
    }
}

export function ReplyMarkupConstructor (resizeKeyboard?: boolean, oneTimeKeyboard?: boolean, inputFieldPlaceholder?: string, selective?: boolean, ...replyButtons: ReplyKeyboardButton[][]): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let replyKeyboard: ReplyKeyboardMarkup = {
        keyboard: replyButtons,
        resize_keyboard: resizeKeyboard,
        one_time_keyboard: oneTimeKeyboard,
        input_field_placeholder: inputFieldPlaceholder,
        selective: selective
    }
    return JSON.stringify(replyKeyboard);
}

export function ReplyButtonConstructor (text: string, requestContact: boolean, requestLocation: boolean): ReplyKeyboardButton {
    return {
        text: text,
        request_contact: requestContact,
        request_location: requestLocation
    }
}

export function ReplyRemoveConstructor (selective?: boolean): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let replyRemove: ReplyKeyboardRemove = {
        remove_keyboard: true,
        selective: selective
    }
    return JSON.stringify(replyRemove);
}

export function ForceReplyConstructor (inputFieldPlaceholder: string, selective?: boolean): string { // ...replyButtons: ReplyKeyboardButton[][], 
    let forceReply: ForceReply = {
        force_reply: true,
        input_field_placeholder: inputFieldPlaceholder,
        selective: selective
    }
    return JSON.stringify(forceReply);
}