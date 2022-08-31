import sequelize from "../database";
import { DataTypes as DT } from "sequelize";

export const UserState = sequelize.define("user-state", {
    user_id: { type: DT.INTEGER, unique: true },
    state: { type: DT.STRING }
})

export const Order = sequelize.define("order", {
    id: { type: DT.INTEGER, primaryKey: true, autoIncrement: true },
    order: { type: DT.STRING },
    phone_number: { type: DT.NUMBER },
    full_name: { type: DT.STRING },
    billing_type: { type: DT.STRING },
    destination: { type: DT.STRING },
    waybill: { type: DT.INTEGER },
    order_state: { type: DT.STRING },
    created_by: { type: DT.INTEGER },
    created_at: { type: DT.DATE },
    updated_by: { type: DT.INTEGER },
    updated_at: { type: DT.DATE }
})
