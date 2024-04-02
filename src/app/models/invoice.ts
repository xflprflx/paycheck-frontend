export class Invoice {
  id?: string;
  number: string;
  deliveryStatus: string;
  scannedDate: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(number: string) {
    this.number = number;
  }
}
