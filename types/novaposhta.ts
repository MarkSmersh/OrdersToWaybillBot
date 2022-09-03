export interface BasicRequest {
    apiKey: string,
    modelName: string,
    calledMethod: string,
    methodProperties: any
}

export interface InternetDocumentSaveRequest {
    SenderWarehouseIndex?: string,
    RecipientWarehouseIndex?: string,
    PayerType: string,
    PaymentMethod: string,
    DateTime: string,
    CargoType: string,
    VolumeGeneral?: string,
    Weight: string,
    ServiceType: string,
    SeatsAmount: string,
    Description: string,
    Cost: string,
    CitySender: string,
    Sender: string,
    SenderAddress: string,
    ContactSender: string,
    SendersPhone: string,
    CityRecipient: string,
    Recipient: string,
    RecipientAddress: string,
    ContactRecipient: string,
    RecipientsPhone: string
    // https://developers.novaposhta.ua/view/model/a90d323c-8512-11ec-8ced-005056b2dbe1/method/a965630e-8512-11ec-8ced-005056b2dbe1
}

export interface BasicResponse {
    success: boolean,
    data: any,
    errors: responseInfo[],
    warnings: responseInfo[],
    info: responseInfo[],
    messageCodes: string[],
    errorCodes: string[],
    warningCodes: string[],
    infoCodes: string[]

}

interface responseInfo {
    [key: number]: string
}

export interface InternetDocumentSaveResponse {
    Ref: string,
    CostOnSite: string,
    EstimatedDeliveryDate: string,
    IntDocNumber: string,
    TypeDocument: string
} 

export interface AddressSearchSettlements {
    TotalCount: string,
    Addresses: {
        Warehouses: string,
        MainDescription: string,
        Area: string,
        Region: string,
        SettlementTypeCode: string,
        Ref: string,
        DeliveryCity: string
    },
    Warehouses: string,
    MainDescription: string,
    Area: string,
    Region: string,
    SettlementTypeCode: string,
    Ref: string,
    DeliveryCity: string
}

export interface RequestTypes {
    InternetDocument: {
        save: {
            request: InternetDocumentSaveRequest,
            response: InternetDocumentSaveResponse[],
        }
    },
    ScanSheet: {
        insertDocuments: {
            request: {
                Document: string[],
                Ref: string,
                Date: string
            }
        }
    },
    Address: {
        searchSettlements: {
            request: {
                CityName: string,
                Limit: string,
                Page: string
            },
            response: AddressSearchSettlements
        }
    }
}

