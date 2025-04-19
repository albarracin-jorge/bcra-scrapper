
interface Quote {
    hour: string;
    operationType: "Electrónico" | "Mostrador";
    buy: string | null;
    sell: string | null;
}

interface Bank {
    name: string;
    quote: Quote[];
}

interface ScrapingResult {
    date: string;
    banks: Bank[];
}

interface QuoteTable {
    id?: number;
    bankName: string;
    hour?: string | null;
    buy?: number | null;
    sell?: number | null;
    date?: Date;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export { Quote, Bank, ScrapingResult, QuoteTable };