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
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
            raw: false, // Interpretar células de data como datas
          });
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
      var invoiceNumbers: any;
      if (transpDoc["Nota Fiscal"] === "string") {
        invoiceNumbers = transpDoc["Nota Fiscal"].split(", ");
        for (const invoiceNumber of invoiceNumbers) {
          const invoice = new Invoice(invoiceNumber);
          invoices.push(invoice);
        }
      } else {
        invoiceNumbers = transpDoc["Nota Fiscal"];
        const invoice = new Invoice(invoiceNumbers);
        invoices.push(invoice);
      }

      var issueDate = transpDoc["Data Emissão"];
      issueDate = issueDate.toString();
      issueDate = issueDate.split(" ")[0];
      const partesData = issueDate.split("/");
      var dia = parseInt(partesData[0], 10);
      dia = dia.toString().length === 1 ? parseInt("0" + dia) : dia;
      var mes = parseInt(partesData[1], 10); 
      mes = mes.toString().length === 1 ? parseInt("0" + mes) - 1 : mes - 1; // Meses em JavaScript são base 0 (0-11)
      var ano = parseInt(partesData[2], 10);
      ano = ano.toString().length === 2 ? parseInt("20" + ano) : ano;
      issueDate = new Date(ano, mes, dia);

      const transportDocument: TransportDocument = {
        number: transpDoc["Número"].toString(),
        serie: transpDoc["Série"].toString(),
        amount: parseFloat(transpDoc["Valor do Frete"].replace(',', '.')),
        addressShipper: transpDoc["Endereço Remetente"],
        issueDate: new Date(issueDate),
        invoices: invoices,
      };
      console.log(transportDocument.issueDate)
      console.log(transportDocument.issueDate.getTime())
      console.log(transportDocument.issueDate.getTimezoneOffset())
      transportDocuments.push(transportDocument);
    }

    return transportDocuments;
  }
}
