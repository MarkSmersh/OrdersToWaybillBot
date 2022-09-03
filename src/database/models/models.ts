import sequelize from "../database";
import { DataTypes as DT, CreationOptional, InferAttributes, InferCreationAttributes, Model, ModelDefined, Optional } from 'sequelize';

export class UserState extends Model<InferAttributes<UserState>, InferCreationAttributes<UserState>> {
    declare user_id: number;
    declare state: string;
}

UserState.init({
    user_id: { type: DT.INTEGER, unique: true },
    state: { type: DT.STRING }
}, { tableName: 'user_states', sequelize });


export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;
    declare order: string;
    declare orderState: "created" | "packaged" | "sended";
    declare phoneNumber: number;
    declare fullName: string;
    declare billingType: "prepaid" | "cash";
    declare destination: string;
    declare waybill: string;
    declare createdBy: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedBy: number;
    declare updatedAt: CreationOptional<Date>;
}

Order.init({
    id: { type: DT.INTEGER, primaryKey: true, autoIncrement: true }, 
    order: { type: DT.STRING }, // example: 
    orderState: { type: DT.STRING }, // "created" | "packaged" | "sended"
    phoneNumber: { type: DT.INTEGER }, // +381234567890
    fullName: { type: DT.STRING }, // ${SecondName} ${FirstName} ${Surname}
    billingType: { type: DT.STRING }, // "prepaid" | "cash"
    destination: { type: DT.STRING }, // get from novaposhta api
    waybill: { type: DT.INTEGER }, // get from novaposhta api
    createdBy: { type: DT.INTEGER }, // chat_id
    createdAt: { type: DT.DATE }, // 
    updatedBy: { type: DT.INTEGER }, // chat_id
    updatedAt: { type: DT.DATE }
}, { tableName: 'orders', sequelize })
