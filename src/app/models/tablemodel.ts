import { TransportDocument } from "./transport-document";

export class TableModel {
  number?: string;
  type?: string;
  amount?: number;
  issueDate?: string;
  invoices?: string;
  deliveryStatus?: string;
  scannedDate?: string;
  paymentForecastByScannedDate?: string;
  approvalDate?: string;
  paymentForecastByPaymentApprovalDate?: string;
  paymentStatus?: string;
  paymentDate?: string;
  paidAmount?: number;
  difference?: any;

  constructor(td: TransportDocument) {
    this.number = td?.number;
    this.type = td?.serie === "11" ? "CT-e" : "NFS-e";
    this.amount = td?.amount;
    this.issueDate = td?.issueDate;
    this.invoices = td?.invoices?.map((x) => x.number).join(", ");
    this.deliveryStatus = td?.invoices?.map((x) => x.deliveryStatus).join(", ");
    this.scannedDate = td?.invoices?.map((x) => x.scannedDate).join(", ");
    this.paymentForecastByScannedDate = td?.paymentForecastByScannedDate;
    this.approvalDate = td?.invoices
      ?.map((x) => x.paymentApprovalDate)
      .join(", ");
    this.paymentForecastByPaymentApprovalDate =
      td?.paymentForecastByPaymentApprovalDate;
    this.paymentStatus = td?.paymentStatus;
    this.paymentDate = td?.paymentDTO?.paymentDate;
    this.paidAmount = td?.paymentDTO?.amount;
    this.difference = td?.paymentDTO != null ? (td?.amount || 0) - (td?.paymentDTO?.amount || 0) : "";
  }
}
