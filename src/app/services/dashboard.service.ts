import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { DashboardProjection } from '../models/dashboard-projection';
import { Observable } from 'rxjs';

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
}
