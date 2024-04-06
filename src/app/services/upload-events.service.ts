import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadEventsService {
  documentPosted = new EventEmitter<void>();
  isLoading = new EventEmitter<boolean>();
  constructor() { }
}
