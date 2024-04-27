import { EventEmitter, Injectable } from '@angular/core';
import { Specification } from '../models/specification';
import { TransportDocument } from '../models/transport-document';

@Injectable({
  providedIn: 'root'
})
export class DashboardEventService {
  onConfirmeDialog = new EventEmitter<void>();
  onUpdateTable = new EventEmitter<Specification>();
  initDash = new EventEmitter<TransportDocument[]>();
  onUpdatePaymentTerms = new EventEmitter<number>();
  isLoading = new EventEmitter<boolean>();
  showTable = new EventEmitter<void>();
  constructor() { }
}
