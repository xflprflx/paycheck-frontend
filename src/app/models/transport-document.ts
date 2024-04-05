import { Invoice } from "./invoice";
import { Payment } from "./payment";

export interface TransportDocument {
    id?: any;
    number?: string;
    serie?: string;
    amount?: number;
    addressShipper?: string;
    issueDate?: string;
    paymentForecastByScannedDate?: string;
    paymentForecastByPaymentApprovalDate?: string;
    paymentStatus?: string;
    invoices: Invoice[];
    paymentDTO?: Payment;
}