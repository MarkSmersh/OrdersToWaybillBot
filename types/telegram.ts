export interface BasicResponse {
    "ok": boolean,
    "result": any,
    "error_code"?: number
};

export interface Message {
    "message_id": number,
    "from"?: User,
    "sender_chat"?: User,
    "date": number,
    "chat": Chat,
    "forward_from"?: User,
    "forward_from_chat"?: Chat,
    "forward_from_message_id"?: number,
    "forward_signature"?: string,
    "forward_sender_name"?: string,
    "forward_date"?: number,
    "is_automatic_forward"?: true,
    "reply_to_message"?: Message,
    "via_bot"?: User,
    "edit_date"?: number,
    "reply_markup"?: InlineKeyboardMarkup
};

export interface InlineKeyboardMarkup {
    "inline_keyboard": [InlineKeyboardButton[]]
};

export interface InlineKeyboardButton {
    "text": string,
    "url": string,
    "callback_data": string,
    //web_app,
    "login_url": LoginUrl,
    "switch_inline_query": string,
    "switch_inline_query_current_chat": string,
    //callback_game,
    "pay": boolean
};

export interface LoginUrl {
    "url": string,
    "forward_text"?: string,
    "bot_username"?: string,
    "request_write_access"?: boolean
};

export interface Update {
    "update_id": number,
    "message": Message,
    "edited_message": Message,
    "channel_post": Message,
    "edited_channel_post": Message
    //add more https://core.telegram.org/bots/api#update
};

export interface User {
    "id": number,
    "is_bot": boolean,
    "first_name"?: string,
    "last_name"?: string,
    "username"?: string,
    "language_code"?: string,
    "is_premium"?: true,
    "added_to_attachment_menu"?: true,
    "can_join_groups"?: boolean,
    "can_read_all_group_messages"?: boolean,
    "supports_inline_queries"?: boolean
};

export interface Chat {
    "id": number,
    "type": string,
    "title"?: string,
    "username"?: string,
    "first_name"?: string,
    "last_name"?: string
};

export interface ResponseEvents {
    "start":  [ message: User ],
    "update": [ update: Update ]
};

export interface RequestTypes {
    "getMe":      { request: {}, response: User },
    "getUpdates": { request: { offset?: number, limit?: number, timeout?: number, allowed_updates?: string[] }, 
                    response: Update[] }
};

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