export type PantryItem = {
    userId: string;
    name: string;
    unit: string;
    quantity: number;
    lastUpdated: Date;
    priceAvgPerUnit: number;
};

export type HistoryRecord = {
    userId: string;
    billId: string;
    itemName: string;
    quantity: number;
    price: number;
    unit: string;
    date: Date;
};