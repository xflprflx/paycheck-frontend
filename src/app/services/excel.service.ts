import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import { TransportDocument } from "../models/transport-document";
import { Invoice } from "../models/invoice";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  convertedJson!: string;
  obj: Object;

  constructor() {}

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        const binaryData = event.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        let convertedJson: string;
        workbook.SheetNames.forEach((sheet) => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          convertedJson = JSON.stringify(data, undefined, 4);
        });
        resolve(convertedJson);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Função para converter os dados da tabela para um array de objetos TransportDocument
  public converterDadosParaTransportDocument(
    data: string
  ): TransportDocument[] {
    const transportDocuments: TransportDocument[] = [];
    const parsedData = JSON.parse(data);

    for (const transpDoc of parsedData) {
      const invoices: Invoice[] = [];
      var invoiceNumbers: any
      if(transpDoc["Nota Fiscal"] === "string") {
        invoiceNumbers = transpDoc["Nota Fiscal"].split(", ")
        for (const invoiceNumber of invoiceNumbers) {
          const invoice = new Invoice(invoiceNumber);
          invoices.push(invoice);
        }
      } else {
        invoiceNumbers = transpDoc["Nota Fiscal"]
        const invoice = new Invoice(invoiceNumbers);
          invoices.push(invoice);
      }
      const transportDocument: TransportDocument = {
        number: transpDoc["Número"].toString(),
        serie: transpDoc["Série"].toString(),
        amount: transpDoc["Valor do Frete"],
        cnpjShipper: transpDoc["CPF/CNPJ Remetente"].toString(),
        issueDate: new Date(transpDoc["Data Emissão"]),
        invoices: invoices,
      };
      transportDocuments.push(transportDocument);
    }

    return transportDocuments;
  }
}
