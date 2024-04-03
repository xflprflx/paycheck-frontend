import { Injectable } from '@angular/core';
import { PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
    providedIn: 'root'
  })
  export class PdfService {
  
    constructor() { }
  
    async extractTablesFromPdf(file: File): Promise<string[]> {
      return new Promise<string[]>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = async (event) => {
          try {
            if (event.target?.result instanceof ArrayBuffer) {
              const pdfData = event.target.result;
              const pdf = await this.loadPdf(pdfData);
              const textContents = await this.extractTextFromPdf(pdf);
              resolve(textContents);
            } else {
              reject(new Error('O resultado da leitura do arquivo não é um ArrayBuffer.'));
            }
          } catch (error) {
            reject(error);
          }
        };
      });
    }
  
    private async loadPdf(pdfData: ArrayBuffer): Promise<PDFDocumentProxy> {
      return pdfjsLib.getDocument({ data: pdfData }).promise;
    }
  
    private async extractTextFromPdf(pdf: PDFDocumentProxy): Promise<string[]> {
      const numPages = pdf.numPages;
      const textContents: string[] = [];
  
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
  
        const pageText = textContent.items.map(async (item) => {
          if ('str' in item) {
            return item.str;
          } else {
            return '';
          }
        });
  
        textContents.push((await Promise.all(pageText)).join('\n'));
      }
  
      return textContents;
    }
  }
  