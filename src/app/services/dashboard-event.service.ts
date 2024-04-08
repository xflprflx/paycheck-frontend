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
  constructor() { }
}
