import axios from "axios";

import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname + "/../../.env") });

import { RequestTypes, BasicRequest, BasicResponse } from "../../../types/novaposhta";

class Client {
    private basicUrl: string = "https://api.novaposhta.ua/v2.0/json/";
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public async request<
        KModel extends keyof RequestTypes,
        KMethod extends keyof RequestTypes[KModel]
    >(
        modelName: KModel,
        calledMethod: KMethod,
        methodProperties: "request" extends keyof RequestTypes[KModel][KMethod]
            ? RequestTypes[KModel][KMethod]["request"]
            : never
    ): Promise<
        "response" extends keyof RequestTypes[KModel][KMethod]
            ? RequestTypes[KModel][KMethod]["response"]
            : never
    > {
        
        let request: BasicRequest = {
            apiKey: this.token,
            modelName: modelName,
            calledMethod: calledMethod as string,
            methodProperties: methodProperties
        };
    
        let response = await axios.get(this.basicUrl,
        {
            data: JSON.stringify(request)
        });

        let data: BasicResponse = await response.data;
        
        if (!data.success) {
            throw new Error(data.errors.join(" | "));
        }

        let result: "response" extends keyof RequestTypes[KModel][KMethod]
            ? RequestTypes[KModel][KMethod]["response"]
            : never = data.data;

        return result;
    }
}

export = new Client(process.env.NV_TOKEN as string);
