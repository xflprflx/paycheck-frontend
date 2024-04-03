import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api.config';
import { TransportDocument } from '../models/transport-document';

@Injectable({
  providedIn: "root",
})
export class TransportDocumentService {
  constructor(private http: HttpClient) {}

  postTransportDocumentList(transportDocuments: TransportDocument[]): Observable<string> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/transportDocuments/list`, transportDocuments, { "responseType":"text" });
  }
}
