import { Invoice } from "./invoice";

export interface TransportDocument {
    id?: any;
    number: string;
    serie: string;
    amount: number;
    cnpjShipper: string;
    issueDate: Date;
    paymentForecast?: Date;
    paymentDate?: Date;
    paymentStatus?: string;
    invoices: Invoice[];
    createdAt?: Date;
    updatedAt?: Date;
}