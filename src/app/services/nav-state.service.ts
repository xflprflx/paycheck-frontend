import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavStateService {
  private _showTableValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showTableValue$ = this._showTableValue.asObservable();

  get showTableValue(): boolean {
    return this._showTableValue.value;
  }

  set showTableValue(value: boolean) {
    this._showTableValue.next(value);
  }
}
