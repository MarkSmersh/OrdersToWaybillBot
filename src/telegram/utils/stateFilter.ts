import { Update } from "../../../types/telegram";
import { Client } from "../client/client";
import { SlashCommands, MessageData, CallbackData } from "../../../types/telegram";
import { stateConfig, StatesList } from "./stateConfig";

export async function StateFilter
<
    KS extends StatesList,
    KT extends EventModel["type"],
    KE extends EventTypeModel[KT],
>(
    state: KS, type: KT, data: KE, args: Parameters<FunctionModel>
): Promise<FunctionReturn> {
    let newState: StatesList | void;
    let isFound = false;

    for (let i = 0; i < stateConfig[state].length; i++) {
        if (stateConfig[state][i].type === type && stateConfig[state][i].data === data) {
            newState = await stateConfig[state][i].function(...args);
            isFound = true;
            break;
        }
    }
    if (isFound) {
        return newState
    } else {
        return await stateConfig[state].find(
            (event) => event.type == type && event.data == "default")
            ?.function(...args);
    }
}

export interface EventModel {
    type: keyof EventTypeModel,
    data: EventTypeModel[keyof EventTypeModel] | "default",
    function: FunctionModel
}

interface EventTypeModel {
    command: SlashCommands,
    callback: CallbackData,
    message: MessageData
}

type FunctionModel = (client: Client, event: Update) => Promise<FunctionReturn>;
export type FunctionReturn = StatesList | void;
