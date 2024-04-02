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

  // readFile(file: File) {
  //   const fileReader = new FileReader();
  //   fileReader.readAsBinaryString(file);
  //   fileReader.onload = (event) => {
  //     let binaryData = event.target.result;
  //     let workbook = XLSX.read(binaryData, { type: "binary" });
  //     workbook.SheetNames.forEach((sheet) => {
  //       const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  //       console.log(":::tipo utils.sheets :::", typeof(data))
  //       console.log(":::valor utils.sheets :::", data)
  //       this.convertedJson = JSON.stringify(data, undefined, 4);
  //       console.log(":::tipo json.stringfy :::", typeof(this.convertedJson))
  //       console.log(":::valor json.stringfy :::", this.convertedJson)
  //     });
  //   };
  //   return this.convertedJson;
  // }

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
    this.obj = JSON.parse(data);
    const transportDocuments: TransportDocument[] = [];

    /*
    // Iterar sobre cada linha dos dados da tabela
    for (const linha of dados) {
      const invoiceNumber =
        typeof linha[5] === "string"
          ? linha[5].split(",").map((numero) => numero.trim())
          : linha[5];
      //      const invoiceNumber = linha[5].split(", ").map((numero) => numero.trim()); // Dividir os números das notas fiscais
      const invoices: Invoice[] = invoiceNumber.map((numero) => ({
        // Mapear cada número para um objeto Invoice
        number: numero,
        deliveryStatus: "", // Definir como necessário
        scannedDate: new Date(), // Definir como necessário
        createdAt: null, // Definir como necessário
        updatedAt: null, // Definir como necessário
      }));

      const transportDocument: TransportDocument = {
        number: linha[0],
        serie: linha[1],
        amount: parseFloat(linha[4].replace(",", ".")), // Converter string para número
        cnpjShipper: linha[3],
        issueDate: new Date(linha[2]), // Converter string para objeto Date
        paymentForecast: null, // Definir como necessário
        paymentDate: null, // Definir como necessário
        paymentStatus: "", // Definir como necessário
        invoices: invoices, // Definir como necessário
        createdAt: null, // Definir como necessário
        updatedAt: null, // Definir como necessário
      };

      transportDocuments.push(transportDocument);
    }*/
    return transportDocuments;
  }
}
