import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { DashboardProjection } from '../models/dashboard-projection';
import { Observable } from 'rxjs';
import { Specification } from '../models/specification';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardProjection(): Observable<DashboardProjection> {
    return this.http.get<DashboardProjection>(
      `${API_CONFIG.baseUrl}/dashboard`
    );
  }

  getDashboardProjectionFiltered(
    spec: Specification
  ): Observable<DashboardProjection> {
    let params = this.specDashboard(spec);
    console.log(params)
    return this.http.get<DashboardProjection>(
      `${API_CONFIG.baseUrl}/dashboard/filtered`,
      { params }
    );
  }

  specDashboard(spec: Specification) {
    let params = new HttpParams();
    if(spec.issueStart != null) {
      params = params.append("issueStart", spec.issueStart);
    }
    if(spec.issueEnd != null) {
      params = params.append("issueEnd", spec.issueEnd);
    }
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
    /*if(spec.paymentStatus != null) {
      params = params.append("paymentStatus", spec.paymentStatus);
    }*/
    if(spec.paymentStatus != null) {
//      const paymentStatusString = spec.paymentStatus.join(','); // Convertendo array de números para string separada por vírgulas
      params = params.append("paymentStatus", spec.paymentStatus);
    }
    return params;
  }
}
