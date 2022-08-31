import sequelize from "../database";
import { DataTypes as DT } from "sequelize";

export const UserState = sequelize.define("user-state", {
    user_id: { type: DT.INTEGER, unique: true },
    state: { type: DT.STRING }
})

export const Order = sequelize.define("order", {
    id: { type: DT.INTEGER, primaryKey: true, autoIncrement: true }, 
    order: { type: DT.STRING }, // example: 
    order_state: { type: DT.STRING }, // "created" | "packaged" | "sended"
    phone_number: { type: DT.NUMBER }, // +381234567890
    full_name: { type: DT.STRING }, // `${SecondName} ${FirstName} ${Surname}`
    billing_type: { type: DT.STRING }, // "prepaid" | "cash"
    destination: { type: DT.STRING }, // get from novaposhta api
    waybill: { type: DT.INTEGER }, // get from novaposhta api
    created_by: { type: DT.INTEGER }, // chat_id
    created_at: { type: DT.DATE }, // 
    updated_by: { type: DT.INTEGER }, // chat_id
    updated_at: { type: DT.DATE }
})
