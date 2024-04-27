import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { DateUtilService } from './date-utils.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  postInvoiceList(invoices: Invoice[]): Observable<string> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/invoices/list`, invoices, {responseType: "text"});
  }

  sendFileAndGetInvoiceList(file: File): Observable<Invoice[]> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Invoice[]>(`${API_CONFIG.baseUrl}/invoices/file`, formData);
  }
}
