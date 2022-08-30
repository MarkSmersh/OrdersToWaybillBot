import { InlineKeyboardButton, InlineKeyboardMarkup, LoginUrl } from "../../../types/telegram";

export function InlineMarkupConstructor (...inlineButtons: InlineKeyboardButton[][]): string {
    let inlineKeyboard: InlineKeyboardMarkup = {
        inline_keyboard: inlineButtons
    }
    return JSON.stringify(inlineKeyboard);
}

export function InlineButtonConstructor (text: string, callbackData: string, url?: string, loginUrl?: LoginUrl): InlineKeyboardButton {
    return {
        text: text,
        callback_data: callbackData,
        url: url
    }
}