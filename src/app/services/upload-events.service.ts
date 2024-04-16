import { Injectable, EventEmitter } from '@angular/core';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class UploadEventsService {
  documentPosted = new EventEmitter<void>();
  invoiceFileSent = new EventEmitter<Invoice[]>();
  isLoading = new EventEmitter<boolean>();
  onCleaningFile = new EventEmitter<void>();
  constructor() { }
}
