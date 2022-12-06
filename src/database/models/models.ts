import sequelize from "../database";
import { DataTypes as DT, CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { CounterpartyTypes, OrderStates, PaymentMethods } from "../../../types/novaposhta";
import { WebAppOrderData } from "../../../types/order";

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
    declare orderState: OrderStates;
    declare phoneNumber: string;
    declare firstName: string;
    declare lastName: string ;
    declare middleName: string;
    declare billingType: PaymentMethods;
    declare price: number;
    declare destination: string;
    declare destinationRef: string;
    declare waybill: string;
    declare createdBy: number;  
    declare createdAt: CreationOptional<Date>;
    declare updatedBy: number;
    declare updatedAt: CreationOptional<Date>;
}

Order.init({
    id: { type: DT.INTEGER, primaryKey: true, autoIncrement: true }, 
    order: { type: DT.STRING  },
    orderState: { type: DT.STRING },
    phoneNumber: { type: DT.STRING },
    lastName: { type: DT.STRING },
    firstName: { type: DT.STRING },
    middleName: { type: DT.STRING },
    billingType: { type: DT.STRING },
    price: { type: DT.STRING },
    destination: { type: DT.STRING },
    destinationRef: { type: DT.STRING },
    waybill: { type: DT.STRING },
    createdBy: { type: DT.INTEGER },
    createdAt: { type: DT.DATE },
    updatedBy: { type: DT.INTEGER },
    updatedAt: { type: DT.DATE }
}, { tableName: 'orders', sequelize })

export class Counterparty extends Model<InferAttributes<Counterparty>, InferCreationAttributes<Counterparty>> {
    declare counterpartyProperty: string;
    declare description: string;
    declare ref: string;
    declare city: string;
    declare counterparty: string;
    declare firstName: string;
    declare lastName: string;
    declare middleName: string;
    declare ownershipFormRef: string;
    declare ownershipFormDescription: string;
    declare edrpou: string;
    declare counterpartyType: CounterpartyTypes;
}

Counterparty.init({
    counterpartyProperty: { type: new DT.STRING(36) },
    description: { type: new DT.STRING(50) },
    ref: { type: new DT.STRING(36), unique: true },
    city: { type: new DT.STRING(36) },
    counterparty: { type: new DT.STRING(36) },
    firstName: { type: new DT.STRING(36) },
    lastName: { type: new DT.STRING(36) },
    middleName: { type: new DT.STRING(36) },
    ownershipFormRef: { type: new DT.STRING(36) },
    ownershipFormDescription: { type: new DT.STRING(36) },
    edrpou: { type: new DT.STRING(36) },
    counterpartyType: { type: new DT.STRING(36) },
}, { tableName: "counterparties", sequelize })

export class CounterpartyContactPersons extends Model<InferAttributes<CounterpartyContactPersons>, InferCreationAttributes<CounterpartyContactPersons>> {
    declare refCounterparty: string;
    declare counterpartyProperty: string;
    declare description: string;
    declare ref: string;
    declare phones: string;
    declare email: string;
    declare lastName: string;
    declare firstName: string;
    declare middleName: string;
}

CounterpartyContactPersons.init({
    refCounterparty: { type: new DT.STRING(50) },
    counterpartyProperty: { type: new DT.STRING(36) },
    description: { type: new DT.STRING(50) },
    ref: { type: new DT.STRING(36), unique: true },
    phones: { type: new DT.STRING(36) },
    email: { type: new DT.STRING(36) },
    lastName: { type: new DT.STRING(36) },
    firstName: { type: new DT.STRING(36) },
    middleName: { type: new DT.STRING(36) }
}, { tableName: "counterparties_contact_persons", sequelize })