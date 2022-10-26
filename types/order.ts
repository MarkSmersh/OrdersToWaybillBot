export const ProductInfo = <const> [
    {
        fullName: "Complect of Ferments",
        shortName: "CF",
        id: 0,
        packaging: [
            {
                value: 100,
                price: 130,
            },
            {
                value: 250,
                price: 180,
            },
            {
                value: 1000,
                price: 680,
            }
        ],
        unit: "kg"
    },
    {
        fullName: "Amylosubtilin",
        shortName: "A",
        id: 1,
        packaging: [
            {
                value: 250,
                price: 105,
            },
            {
                value: 1000,
                price: 370,
            }
        ],
        unit: "g"
    },
    {
        fullName: "Glucavamorin",
        shortName: "G",
        id: 2,
        packaging: [
            {
                value: 250,
                price: 105,
            },
            {
                value: 1000,
                price: 370,
            }
        ],
        unit: "g"
    },
    {
        fullName: "Cellulase",
        shortName: "C",
        id: 3,
        packaging: [
            {
                value: 250,
                price: 220,
            },
            {
                value: 1000,
                price: 650,
            }
        ],
        unit: "g"
    },
    {
        fullName: "Protosubtilin",
        shortName: "PTS",
        id: 4,
        packaging: [
            {
                value: 250,
                price: 105,
            },
            {
                value: 1000,
                price: 550,
            }
        ],
        unit: "g"
    },
    {
        fullName: "Beta-glucanase",
        shortName: "BTG",
        id: 5,
        packaging: [
            {
                value: 250,
                price: 190,
            },
            {
                value: 1000,
                price: 520,
            }
        ],
        unit: "g"
    },
    {
        fullName: "Yeast",
        shortName: "DZ",
        id: 6,
        packaging: [
            {
                value: 100,
                price: 150,
            },
            {
                value: 250,
                price: 0,
            },
            {
                value: 500,
                price: 650,
            },
            {
                value: 1000,
                price: 1300,
            },
        ],
        unit: "g"
    },
    {
        fullName: "Defoamer",
        shortName: "PG",
        id: 7,
        packaging: [
            {
                value: 100,
                price: 140
            },
            {
                value: 250,
                price: 300,
            },
        ],
        unit: "g"
    },
    {
        fullName: "Yeast for Bear",
        shortName: "DLG",
        id: 8,
        packaging: [
            {
                value: 100,
                price: 150,
            },
            {
                value: 250,
                price: 0,
            },
            {
                value: 500,
                price: 650,
            },
            {
                value: 1000,
                price: 1300,
            },
        ],
        unit: "g"
    },
]

export interface WebAppOrderData {
    order: WebAppOrderDataBasket[],
    costumerData: {
        phoneNumber: string,
        lastName: string,
        firstName: string,
        middleName: string
    },
    mailData: {
        settlement: WebAppSelected,
        destination: WebAppSelected,
        scanSheet: string
    },
    billingData: {
        type: WebAppSelected,
        whoPays: WebAppSelected
    }
}

interface WebAppOrderDataBasket {
    name: string,
    packaging: number,
    unit: string,
    amount: number
}

interface WebAppSelected {
    id: string | number,
    name: string,
    description?: string
}


