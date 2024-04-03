export class Invoice {
  id?: string;
  number: string;
  deliveryStatus?: string;
  scannedDate?: string;
  paymentApprovalDate?: string; 

  constructor(number: string) {
    this.number = number;
  }
}
