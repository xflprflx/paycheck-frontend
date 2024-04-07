import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class DateUtilService {
  stringToDate(date: string) {
    const partesData = date.toString().split("/");
    var dia = partesData[0];
    dia = dia.toString().length === 1 ? "0" + dia : dia;
    var mes = partesData[1];
    mes = mes.toString().length === 1 ? "0" + mes.toString() : mes;
    var ano = partesData[2];
    ano = ano.toString().length === 2 ? "20" + ano : ano;

    return new Date(ano+"-"+mes+"-"+dia);
  }
}
