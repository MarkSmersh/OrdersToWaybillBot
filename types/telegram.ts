export interface BasicResponse {
    "ok": boolean,
    "result": any,
    "error_code"?: number
};

export interface Message {
    "id": number,
    "is_bot": boolean,
    "first_name": string,
    "username": string,
    "can_join_groups": boolean,
    "can_read_all_group_messages": boolean,
    "supports_inline_queries": boolean
};

export interface Update {
    "update_id": number,
    "message": Message,
    "edited_message": Message,
    "channel_post": Message,
    "edited_channel_post": Message
    //add more https://core.telegram.org/bots/api#update
};


export interface ResponseEvents {
    "start":  [ message: Message ],
    "update": [ update: Update ]
};

export interface RequestTypes {
    "getMe":      { request: {}, response: Message },
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