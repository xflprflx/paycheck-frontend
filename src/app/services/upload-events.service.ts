import { Injectable, EventEmitter } from '@angular/core';
import { Invoice } from '../models/invoice';
import { TransportDocument } from '../models/transport-document';

@Injectable({
  providedIn: 'root'
})
export class UploadEventsService {
  documentPosted = new EventEmitter<void>();
  invoiceFileSent = new EventEmitter<Invoice[]>();
  transportDocumentFileSent = new EventEmitter<TransportDocument[]>();
  isLoading = new EventEmitter<boolean>();
  onCleaningFile = new EventEmitter<void>();
  constructor() { }
}
