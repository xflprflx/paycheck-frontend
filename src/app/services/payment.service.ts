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

  getPaymentsFiltered(
    spec: Specification
  ): Observable<Payment[]> {
    let params = this.specDashboard(spec);
    return this.http.get<Payment[]>(
      `${API_CONFIG.baseUrl}/payments/filtered`,
      { params }
    );
  }

  specDashboard(spec: Specification) {
    let params = new HttpParams();
    params = params.append("issueStart", spec.issueStart);
    params = params.append("issueEnd", spec.issueEnd);
    if(spec.scannedStart != null) {
      params = params.append("scannedStart", spec.scannedStart);
    }
    if(spec.scannedEnd != null) {
      params = params.append("scannedEnd", spec.scannedEnd);
    }
    if(spec.forecastScStart != null) {
      params = params.append("forecastScStart", spec.forecastScStart);
    }
    if(spec.forecastScEnd != null) {
      params = params.append("forecastScEnd", spec.forecastScEnd);
    }
    if(spec.forecastApprStart != null) {
      params = params.append("forecastApprStart", spec.forecastApprStart);
    }
    if(spec.forecastApprEnd != null) {
      params = params.append("forecastApprEnd", spec.forecastApprEnd);
    }
    if(spec.approvalStart != null) {
      params = params.append("approvalStart", spec.approvalStart);
    }
    if(spec.approvalEnd != null) {
      params = params.append("approvalEnd", spec.approvalEnd);
    }
    if(spec.paymentStart != null) {
      params = params.append("paymentStart", spec.paymentStart);
    }
    if(spec.paymentEnd != null) {
      params = params.append("paymentEnd", spec.paymentEnd);
    }
    if(spec.paymentStatus != null) {
      params = params.append("paymentStatus", spec.paymentStatus);
    }
    
    return params;
  }

}
