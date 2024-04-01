import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  readFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log('Dados do Excel:', excelData);
    };
    fileReader.readAsArrayBuffer(file);
  }
}
