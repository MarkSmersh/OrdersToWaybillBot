import axios from "axios";
import { ResponseEvents, RequestTypes, Update, BasicResponse } from "../../../types/telegram";
import { EventEmitter } from "node:events";

export class Client extends EventEmitter {
    private basicUri = "https://api.telegram.org/bot";
    private token: string;

    constructor (token: string) {
        super();
        this.token = token;
    }

    public load () {
        this.emit("load");
    } 

    public async start () {
        let answer = await this.request("getMe");
        if (answer) {
            this.emit("start", answer);
            this.longpoll();
        }
    }

    public async request<K extends keyof RequestTypes>(methodName: K, methodParams: RequestTypes[K]["request"] = {}): Promise<RequestTypes[K]["response"]> {  
        let response = await axios.get(this.basicUri + this.token + "/" + methodName + "?" + this.URLSearchParamsFixed(methodParams));
        let data: BasicResponse = await response.data;

        if (!data.ok) {
            throw new Error(`Bad response from telegram api`);
        }

        let result: RequestTypes[K]["response"] = data.result;
            
        return result;
    }

    private async longpoll (updateId: number = 0) {
        let updates = await this.request("getUpdates", 
            { offset: (updateId != 0) ? updateId + 1 : updateId, timeout: 60});

        updates.forEach((update: Update) => {
            this.emit("update", update);
        })

        await this.longpoll(updates.at(-1)?.update_id);
    }

    private URLSearchParamsFixed (init: any): string { // if someone has idea how to solve any to sth better write to issues
        var str = [];
        for (var p in init)
            if (init.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(init[p]));
            }
        return str.join("&");
    }
}