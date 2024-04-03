import { Invoice } from "./invoice";

export interface TransportDocument {
    id?: any;
    number: string;
    serie: string;
    amount: number;
    addressShipper: string;
    issueDate?: string;
    paymentForecast?: string;
    paymentDate?: string;
    paymentStatus?: string;
    invoices: Invoice[];
}