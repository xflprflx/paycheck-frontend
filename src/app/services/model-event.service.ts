import { EventEmitter, Injectable } from "@angular/core";
import { TransportDocument } from "../models/transport-document";
import { Payment } from "../models/payment";

@Injectable({
  providedIn: "root",
})
export class ModelEventService {
  transportDocuments = new EventEmitter<TransportDocument[]>();
  payments = new EventEmitter<Payment[]>();
  constructor() {}
}
