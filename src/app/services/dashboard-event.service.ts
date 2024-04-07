import { EventEmitter, Injectable } from '@angular/core';
import { Specification } from '../models/specification';

@Injectable({
  providedIn: 'root'
})
export class DashboardEventService {
  onConfirmeDialog = new EventEmitter<void>();
  onUpdateTable = new EventEmitter<Specification>();
  constructor() { }
}
