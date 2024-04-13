import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parameters } from "../models/parameters";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getPaymentTerms(): Observable<number> {
    return this.http.get<number>(`${API_CONFIG.baseUrl}/parameters`);
  }

  updatePaymentTerms(parameters: Parameters): Observable<Parameters> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Parameters>(`${API_CONFIG.baseUrl}/parameters/new`, parameters, { headers });
  }
  
}
