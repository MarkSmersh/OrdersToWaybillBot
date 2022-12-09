export interface BasicRequest {
    apiKey: string,
    modelName: string,
    calledMethod: string,
    methodProperties: any
}

export interface InternetDocumentSaveRequest {
    SenderWarehouseIndex?: string,
    RecipientWarehouseIndex?: string,
    PayerType: CounterpartyTypes,
    PaymentMethod: PaymentMethods,
    DateTime: string,
    CargoType: string,
    VolumeGeneral?: string,
    Weight: string,
    ServiceType: ServiceTypes,
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

export interface CounterpartySaveRequest {
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Phone: string,
    Email: string,
    CounterpartyType: CounterpartyTypes,
    CounterpartyProperty: CounterpartyProperties
}

export interface AddressGetWarehousesRequest {
    CityName?: string,
    FindByString?: string, 
    CityRef?: string,
    Page?: string,
    Limit?: string,
    Language?: "UA",
    TypeOfWarehouseRef?: string,
    WarehouseId?: string,
    SettlementRef?: string,
    Ref?: string
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

export interface CounterpartySaveResponse {
    Ref: string,
    Description: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Counterparty: string,
    OwnershipForm: string,
    OwnershipFormDescription: string,
    EDRPOU: string,
    CounterpartyType: CounterpartyTypes,
    ContactPerson: ContactPerson
}

interface ContactPerson extends BasicResponse {
    data: {
        Ref: string,
        Description: string,
        LastName: string,
        FirstName: string,
        MiddleName: string
    }[]
}

export interface CounterpartyGetCounterpartiesResponse {
    Description: string,
    Ref: string,
    City: string,
    Counterparty: string,
    FirstName: string,
    LastName: string,
    MiddleName: string,
    OwnershipFormRef: string,
    OwnershipFormDescription: string,
    EDRPOU: string,
    CounterpartyType: string
}

export interface AddressGetWarehousesResponse {
    SiteKey: string,
    Description: string,
    ShortAddress: string,
    Phone: string,
    TypeOfWarehouse: string,
    Ref: string,
    Number: string,
    CityRef: string,
    CityDescription: string,
    SettlementRef: string,
    SettlementDescription: string,
    SettlementAreaDescription: string,
    SettlementRegionsDescription: string,
    SettlementTypeDescription: string,
    Longitude: number,
    Latitude: number,
    PostFinance: "1" | "0",
    BicycleParking: "1" | "0",
    PaymentAccess: "1" | "0",
    POSTerminal: "1" | "0",
    InternationalShipping: "1" | "0",
    SelfServiceWorkplacesCount: "1" | "0",
    TotalMaxWeightAllowed: string,
    PlaceMaxWeightAllowed: string,
    SendingLimitationsOnDimensions: Dimensions,
    ReceivingLimitationsOnDimensions: Dimensions,
    Reception: Week,
    Delivery: Week,
    Schedule: Week,
    DistrictCode: string,
    WarehouseStatus: "Working" | string,
    WarehouseStatusDate: string,
    CategoryOfWarehouse: string,
    RegionCity: string,
    WarehouseForAgent: "1" | "0",
    MaxDeclaredCost: string,
    DenyToSelect: "1" | "0",
    PostMachineType: "None" | "FullDayService" | "PartTime" | "ForResidentOfEntrance" | "Private" | "LimitedAccess",
    PostalCodeUA: string,
    OnlyReceivingParcel: "1" | "0",
    WarehouseIndex: string
}

export type CounterpartyProperties = "Sender" | "Recipient" | "ThirdPerson";
export type ServiceTypes = "DoorsDoors" | "DoorsWarehouse" | "WarehouseWarehouse" | "WarehouseDoors";
export type PaymentMethods = "Cash" | "NonCash";
export type CounterpartyTypes = "Recipient" | string;
export type OrderStates = "created" | "packaged" | "sended";

interface Dimensions {
    Width: number,
    Height: number,
    Length: number
}

interface Week {
    Monday: string,
    Tuesday: string,
    Wednesday: string,
    Thursday: string,
    Friday: string,
    Saturday: string,
    Sunday: string
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
            response: AddressSearchSettlements[]
        },
        getWarehouseTypes: {
            request: {},
            response: {
                Ref: string,
                Description: string
            }[]
        },
        getWarehouses: {
            request: AddressGetWarehousesRequest,
            response: AddressGetWarehousesResponse[]
        }

    },
    Counterparty: {
        save: {
            request: CounterpartySaveRequest,
            response: CounterpartySaveResponse[]
        },
        getCounterparties: {
            request: {
                FindByString?: string,
                CounterpartyProperty: CounterpartyProperties,
                Page: string
            }, 
            response: CounterpartyGetCounterpartiesResponse[]
        },
        getCounterpartyAddresses: {
            request: {
                Ref: string,
                CounterpartyProperty: CounterpartyProperties
            },
            response: {
                Ref: string,
                Description: string
            }[]
        },
        getCounterpartyContactPersons: {
            request: {
                Ref: string,
                Page?: string
            },
            response: {
                Description: string,
                Ref: string,
                Phones: string,
                Email: string,
                LastName: string,
                FirstName: string,
                MiddleName: string
            }[]
        }
    },
}