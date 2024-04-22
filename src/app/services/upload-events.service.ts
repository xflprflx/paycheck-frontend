import { Injectable, EventEmitter } from '@angular/core';
import { Invoice } from '../models/invoice';
import { TransportDocument } from '../models/transport-document';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class UploadEventsService {
  documentPosted = new EventEmitter<void>();
  invoiceFileSent = new EventEmitter<Invoice[]>();
  transportDocumentFileSent = new EventEmitter<TransportDocument[]>();
  transportDocumentPosted = new EventEmitter<void>();
  paymentDocumentPosted = new EventEmitter<void>();
  paymentFileSent = new EventEmitter<Payment[]>();
  isLoading = new EventEmitter<boolean>();
  onCleaningFile = new EventEmitter<void>();
  constructor() { }
}
