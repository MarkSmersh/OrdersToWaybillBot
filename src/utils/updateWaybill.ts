import { Order } from "../database/models/models";
import NovaposhtaClient from "../novaposhta/NovaposhtaClient";
import { CounterpartyTypes, ServiceTypes } from "../types/novaposhta";
import { warehouseType } from "./warehouseType";

export async function updateWaybill (orderId: string) {
    const order = await Order.findByPk(orderId);
    
    if (order) {
        const warehouse = (await NovaposhtaClient.request("Address", "getWarehouses", { Ref: order.destinationRef }))[0];

        const counterparty = (await NovaposhtaClient.request("Counterparty", "getCounterparties", { CounterpartyProperty: "Sender", Page: "1" })).find((c) => c.FirstName === "Приватна особа");

        const sender = (await NovaposhtaClient.request("Counterparty", "getCounterpartyContactPersons", { Ref: counterparty?.Ref as string }))[0];

        const recipient = (await NovaposhtaClient.request("Counterparty", "save", {
            FirstName: order.firstName,
            MiddleName: order.middleName,
            LastName: order.lastName,
            Phone: order.phoneNumber,
            Email: "",
            CounterpartyProperty: "Recipient",
            CounterpartyType: "PrivatePerson"
        }))[0];

        console.log(
            {
                RecipientWarehouseIndex: warehouse.WarehouseIndex,
                PayerType: order?.whoPays as CounterpartyTypes,
                Weight: "0,5",
                ServiceType: (warehouseType(warehouse.TypeOfWarehouse) === "Warehouse") ? "WarehouseWarehouse" : "" as ServiceTypes,
                SeatsAmount: "1",
                Description: "Харчові добавки",
                Cost: (order.billingType === "Cash") ? order.price.toString() : "500",
                CitySender: warehouse.CityRef,
                Sender: sender?.Ref,
                ContactSender: sender.Ref,
                SendersPhone: sender.Phones,
                CityRecipient: warehouse.CityRef,
                Recipient: recipient.Ref,
                ContactRecipient: recipient.ContactPerson.data[0].Ref,
                RecipientsPhone: order.phoneNumber,
                PaymentMethod: order.billingType,
                CargoType: "Cargo"
            }
        )

        const internetDocument = (await NovaposhtaClient.request("InternetDocument", "save", {
            RecipientWarehouseIndex: warehouse.WarehouseIndex,
            PayerType: order?.whoPays as CounterpartyTypes,
            Weight: "0,5",
            ServiceType: (warehouseType(warehouse.TypeOfWarehouse) === "Warehouse") ? "WarehouseWarehouse" : "WarehouseWarehouse" as ServiceTypes,
            SeatsAmount: "1",
            Description: "Харчові добавки",
            Cost: (order.billingType === "Cash") ? order.price.toString() : "500",
            CitySender: warehouse.CityRef,
            Sender: counterparty?.Ref,
            ContactSender: sender.Ref,
            SendersPhone: sender.Phones,
            CityRecipient: warehouse.CityRef,
            Recipient: recipient.Ref,
            ContactRecipient: recipient.ContactPerson.data[0].Ref,
            RecipientsPhone: order.phoneNumber,
            PaymentMethod: (order.billingType === "Cash" || order.whoPays === "Recipient") ? "Cash" : "NonCash",
            CargoType: "Cargo"
        }))[0];

        await Order.update({ waybill: internetDocument.IntDocNumber }, { where: { id: orderId } });

        return internetDocument.IntDocNumber;
    }
}