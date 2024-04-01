export interface Invoice {
    id?: string;
    number: string;
    deliveryStatus: string;
    scannedDate: Date;
    createdAt: Date;
    updatedAt: Date;
}