import axios, { AxiosError, AxiosResponse } from "axios";
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
        let response: AxiosResponse<any, any> = await new Promise (async (resolve) => {
            let request = axios.get(
                this.basicUri + this.token + "/" + methodName + "?" + new URLSearchParams(methodParams as Record<string, string>)
            );

            request.catch((e: AxiosError) => {
                let data = e.response?.data as BasicResponse;
                throw new Error(`Bad response from telegram api:\n${e.message}\n${data.description}`);
            })

            request.then((e) => {
                resolve(e);
            })
        })

        let data: BasicResponse = await response.data;

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
}