declare module 'node:events' {
    class EventEmitter {
      // Add type overloads for client events.
      // Thanks for DiscordJS, that teached me this technik
  
      public on<K extends keyof ResponseEvents>(eventName: K, listener: (...args: ResponseEvents[K]) => void): this;
  
      public once<K extends keyof ResponseEvents>(event: K, listener: (...args: ResponseEvents[K]) => void): this;
      
      public emit<K extends keyof ResponseEvents>(event: K, ...args: ResponseEvents[K]): boolean;
  
      public off<K extends keyof ResponseEvents>(event: K, listener: (...args: ResponseEvents[K]) => void): this;
  
      public removeAllListeners<K extends keyof ResponseEvents>(event?: K): this;
    }
};

//#region ResponseTypes

export interface BasicResponse {
    ok: boolean,
    result: any,
    error_code?: number
};

export interface Message {
    text?: string,
    message_id: number,
    from?: User,
    sender_chat?: User,
    date: number,
    chat: Chat,
    forward_from?: User,
    forward_from_chat?: Chat,
    forward_from_message_id?: number,
    forward_signature?: string,
    forward_sender_name?: string,
    forward_date?: number,
    is_automatic_forward?: true,
    reply_to_message?: Message,
    via_bot?: User,
    edit_date?: number,
    has_protected_content?: true,
    media_group_id?: string,
    author_signature?: string,
    entities?: MessageEntity[],
    reply_markup?: InlineKeyboardMarkup,
};

export interface InlineKeyboardMarkup {
    inline_keyboard: InlineKeyboardButton[][]
};

export interface InlineKeyboardButton {
    text: string,
    url?: string,
    callback_data?: string,
    //web_app,
    login_url?: LoginUrl,
    switch_inline_query?: string,
    switch_inline_query_current_chat?: string,
    //callback_game,
    pay?: boolean
};

export interface LoginUrl {
    url: string,
    forward_text?: string,
    bot_username?: string,
    request_write_access?: boolean
};

export interface Update {
    update_id: number,
    message: Message,
    edited_message: Message,
    channel_post: Message,
    edited_channel_post: Message,
    inline_query: InlineQuery,
    // chosen_inline_result,
    callback_query: CallbackQuery
    //add more https://core.telegram.org/bots/api#update
};

export interface InlineQuery {
    id: string,
    from: User,
    query: string,
    offset: string,
    chat_type?: string,
}

export interface User {
    id: number,
    is_bot: boolean,
    first_name?: string,
    last_name?: string,
    username?: string,
    language_code?: string,
    is_premium?: true,
    added_to_attachment_menu?: true,
    can_join_groups?: boolean,
    can_read_all_group_messages?: boolean,
    supports_inline_queries?: boolean
};

export interface Chat {
    id: number,
    type: string,
    title?: string,
    username?: string,
    first_name?: string,
    last_name?: string
};

export interface CallbackQuery {
    id: string,
    from: User,
    message?: Message,
    inline_message_id?: string,
    chat_instance: string,
    data?: string,
    game_short_name?: string
}

//#endregion

//#region EntitiesTypes

export interface MessageEntity {
    type: "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" 
    | "underline" | "strikethrough" | "spoiler" | "code" | "pre" | "text_link" | "text_mention" | "custom_emoji",
    offset: number,
    length: number,
    url: string,
    user: User,
    language: string,
    custom_emoji_id: string
}

//#endregion

//#region ClientTypes

export interface ResponseEvents {
    load: [],
    start:  [ message: User ],
    update: [ update: Update ]
};

type ParseModes = "MarkdownV2"| "HTML" | "Markdown";

export interface RequestTypes {
    getMe: {
        request: {}, response: User 
    },
    getUpdates: {
        request: { offset?: number, limit?: number, timeout?: number, allowed_updates?: string[] }, 
        response: Update[] 
    },
    sendMessage: { 
        request: 
            { 
                chat_id: number | undefined, text: string | undefined, parse_mode?: ParseModes, 
                entities?: MessageEntity[], disable_web_page_preview?: boolean, disable_notification?: boolean,
                protect_content?: boolean, reply_to_message_id?: number, allow_sending_without_reply?: boolean,
                reply_markup?: InlineKeyboardMarkup | string
            },
        response: Message 
    },
    editMessageText: { 
        request: 
        {
            chat_id: number | undefined, message_id: number, text: string, inline_message_id?: string, 
            parse_mode?: ParseModes, entites?: MessageEntity[], disable_web_page_preview?: boolean,
            reply_markup?: InlineKeyboardMarkup 
        },
        response: Message 
    },
    answerCallbackQuery: {
        request: 
        {
            callback_query_id: string, text?: string, show_alert?: boolean, url?: string,
            cache_time?: number
        },
        response: true
    }
};

export type SlashCommands = "/start" | "/help" | "/ping";

//#endregion
