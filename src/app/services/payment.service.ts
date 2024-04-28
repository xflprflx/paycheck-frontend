import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { API_CONFIG } from '../config/api.config';
import { Specification } from '../models/specification';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(
      `${API_CONFIG.baseUrl}/payments`
    );
  }

  getPaymentsWithoutDoc(): Observable<Payment[]> {
    return this.http.get<Payment[]>(
      `${API_CONFIG.baseUrl}/payments/paymentsWithoutDoc`
    );
  }

  sendFileAndGetPaymentList(file: File): Observable<Payment[]> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Payment[]>(`${API_CONFIG.baseUrl}/payments/file`, formData);
  }

  postPaymentList(payments: Payment[]): Observable<string> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/payments/list`, payments, { "responseType":"text" });
  }

}
