import { Payment } from "./../models/payment";
import { registerLocaleData } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_CONFIG } from "../config/api.config";
import { TransportDocument } from "../models/transport-document";
import { Specification } from "../models/specification";

@Injectable({
  providedIn: "root",
})
export class TransportDocumentService {
  constructor(private http: HttpClient) {}

  postTransportDocumentList(
    transportDocuments: TransportDocument[]
  ): Observable<string> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/transportDocuments/list`,
      transportDocuments,
      { responseType: "text" }
    );
  }

  getTransportDocuments(): Observable<TransportDocument[]> {
    return this.http.get<TransportDocument[]>(
      `${API_CONFIG.baseUrl}/transportDocuments`
    );
  }

  lockPayment(id: number, reasonReduction: string): Observable<string> {
    return this.http.put(
      `${API_CONFIG.baseUrl}/transportDocuments/blockPayment/${id}`,
      reasonReduction,
      { responseType: "text" }
    );
  }

  unlockPayment(id: number, paymentStatus: number): Observable<string> {
    return this.http.put(
      `${API_CONFIG.baseUrl}/transportDocuments/unlockPayment/${id}`,
      paymentStatus,
      { responseType: "text" }
    );
  }

  deletePayment(id: number): Observable<string> {
    return this.http.delete(`${API_CONFIG.baseUrl}/transportDocuments/${id}`, {
      responseType: "text",
    });
  }

  getTransportDocumentsFiltered(
    spec: Specification
  ): Observable<TransportDocument[]> {
    let params = this.specDashboard(spec);
    return this.http.get<TransportDocument[]>(
      `${API_CONFIG.baseUrl}/transportDocuments/filtered`,
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
