import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post<any>('http://localhost:3000/upload', formData).toPromise();
  }
}
