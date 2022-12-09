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
        type: "Ferments",
        unit: "kg",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Ferments",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Ferments",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Ferments",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Ferments",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Ferments",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Yeasts",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Defoamer",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
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
        type: "Yeasts",
        unit: "g",
        img: "https://cdn-icons-png.flaticon.com/512/1748/1748107.png"
    },
]

export interface WebAppOrderData {
    basket: WebAppOrderDataBasket[],
    price: number,
    phoneNumber: string,
    lastName: string,
    firstName: string,
    middleName: string,
    settlement: WebAppSelected,
    destination: WebAppSelected,
    scanSheet: string
    type: WebAppSelected,
    whoPays: WebAppSelected
}

interface WebAppOrderDataBasket {
    productId: number,
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

export interface QueryEdit {
    token?: string,
    orderData: {
        data: {
            name: string,
            type: string,
            packaging: Record<number, number>,
            unit: string,
            img: string
        }[],
        basket: {
            id: number,
            packaging: number,
            amount: number
        }[],
        price: number
    },
    costumerData: {
        phoneNumber: string,
        lastName: string,
        firstName: string,
        middleName: string
    },
    mailData: {
        settlement: {
            data: [],
            selected: string
        },
        destination: {
            data: [],
            selected: string
        },
        scanSheet: string
    },
    billingData: {
        type: {
            data: [],
            selected: string
        },
        whoPays: {
            data: [],
            selected: string
        },
    }
}

export interface QueryCreate {
    token?: string,
    orderData: {
        data: {
            name: string,
            type: string,
            packaging: Record<number, number>,
            unit: string,
            img: string
        }[],
    },
}

export interface OrderData {
    productId: number,
    packaging: number,
    amount: number
}