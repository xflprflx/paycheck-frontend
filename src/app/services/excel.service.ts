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
      if (typeof transpDoc["Nota Fiscal"] === "string") {
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
      var dia = partesData[0];
      dia = dia.toString().length === 1 ? ("0" + dia) : dia;
      console.log("dia",dia.toString())
      var mes = partesData[1]; 
      mes = mes.toString().length === 1 ? ("0" + (mes).toString()) : mes;
      var ano = partesData[2];
      ano = ano.toString().length === 2 ? ("20" + ano) : ano;
      issueDate = ano+"-"+mes+"-"+dia+"T00:00:00.000";

      const transportDocument: TransportDocument = {
        number: transpDoc["Número"].toString(),
        serie: transpDoc["Série"].toString(),
        amount: parseFloat(transpDoc["Valor do Frete"].replace(',', '.')),
        addressShipper: transpDoc["Endereço Remetente"],
        issueDate: issueDate,
        invoices: invoices,
      };
      console.log(transportDocument.issueDate)
      transportDocuments.push(transportDocument);
    }

    return transportDocuments;
  }

  public converterDadosParaInvoice(data: string): Invoice[] {
    const invoices: Invoice[] = [];
    const parsedData = JSON.parse(data);

    for (const inv of parsedData) {
      var scannedDate = inv["Data Digitalização"];
      if(scannedDate) {
        scannedDate = scannedDate.toString();
        scannedDate = scannedDate.split(" ")[0];
        const scannedDatepart = scannedDate.split("/");
        var dia = scannedDatepart[0];
        dia = dia.toString().length === 1 ? ("0" + dia) : dia;
        var mes = scannedDatepart[1]; 
        mes = mes.toString().length === 1 ? ("0" + (mes).toString()) : mes;
        var ano = scannedDatepart[2];
        ano = ano.toString().length === 2 ? ("20" + ano) : ano;
        scannedDate = ano+"-"+mes+"-"+dia+"T00:00:00.000";
      }

      var paymentApprovalDate = inv["Data Liberação Pagamento"];
      if(paymentApprovalDate) {
        paymentApprovalDate = paymentApprovalDate.toString();
        paymentApprovalDate = paymentApprovalDate.split(" ")[0];
        const paymentApprovalDatePart = paymentApprovalDate.split("/");
        var dia = paymentApprovalDatePart[0];
        dia = dia.toString().length === 1 ? ("0" + dia) : dia;
        var mes = paymentApprovalDatePart[1]; 
        mes = mes.toString().length === 1 ? ("0" + (mes).toString()) : mes;
        var ano = paymentApprovalDatePart[2];
        ano = ano.toString().length === 2 ? ("20" + ano) : ano;
        paymentApprovalDate = ano+"-"+mes+"-"+dia+"T00:00:00.000";
      }

      const invoice: Invoice = {
        number: inv["Número"],
        scannedDate: scannedDate,
        paymentApprovalDate: paymentApprovalDate, 
      }

      invoices.push(invoice);
      console.log(invoices)
    }
    console.log(invoices)

    return invoices;
  }

}
