import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { Specification } from '../models/specification';
import { TransportDocument } from '../models/transport-document';

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

  sendFileAndGetTransportDocumentList(file: File): Observable<TransportDocument[]> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<TransportDocument[]>(`${API_CONFIG.baseUrl}/transportDocuments/file`, formData);
  }


}
