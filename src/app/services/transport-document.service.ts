import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransportDocument } from "../models/transport-document";
import { API_CONFIG } from "../config/api.config";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransportDocumentService {
  constructor(private http: HttpClient) {}

  postTransportDocumentList(
    transportDocuments: TransportDocument[]
  ): Observable<TransportDocument[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    console.log("to no service")
    return this.http.post<TransportDocument[]>(
      `${API_CONFIG.baseUrl}/transportDocuments/list`,
      transportDocuments,
      { headers }
    );
  }

  // postTransportDocumentList(transportDocuments: TransportDocument[]):Observable<TransportDocument[]> {
  //   console.log(transportDocuments)
  //   console.log(API_CONFIG.baseUrl)
  //   return this.http
  //     .post(`${API_CONFIG.baseUrl}/transportDocuments/list`, transportDocuments)
  //     .pipe(
  //       catchError((error) => {
  //         console.error("Error saving transport documents:", error);
  //         return throwError(error); // Re-throw the error for handling in the component
  //       })
  //     );
  // }

  // postTransportDocumentList(transportDocuments: TransportDocument[]) {
  //   if(true){
  //     console.log("post service")
  //     this.http.post(`${API_CONFIG.baseUrl}/transportDocuments/list`, transportDocuments);
  //     console.log("post service")
  //   }
  // return this.http.post(`${API_CONFIG.baseUrl}/transportDocuments/list`, transportDocuments)
  //   .pipe(
  //     map((response: any) => {
  //       console.log("post service")
  //       // Verifica se a resposta contém uma lista de documentos de transporte
  //       if (Array.isArray(response)) {
  //         return response as TransportDocument[];
  //       } else {
  //         // Se a resposta não contiver uma lista, lança um erro
  //         throw new Error('Resposta inválida do servidor');
  //       }
  //     }),
  //     catchError((error: any) => {
  //       // Trata erros de solicitação HTTP
  //       return throwError(error); // Use throwError corretamente aqui
  //     })
  //   );
}
