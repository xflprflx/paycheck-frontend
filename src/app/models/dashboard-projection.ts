import { TransportDocument } from "./transport-document";
import { Payment } from "./payment";

export interface DashboardProjection {
  pendingAmountValue: number;
  paidAmountValue: number;
  debateAmountValue: number;
  scannedLeadTimeValue: number;
  approvalLeadTimeValue: number;
  payments: Payment[];
  transportDocuments: TransportDocument[];
}
