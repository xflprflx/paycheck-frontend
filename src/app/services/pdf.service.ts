import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  convertedJson!: string;
  
  constructor() { }

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
}
