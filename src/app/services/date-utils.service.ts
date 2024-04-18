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

    return new Date(ano + "-" + mes + "-" + dia + "T00:00:00.000");
  }

  stringToISO8601(date: string) {
    const partesData = date.toString().split("/");
    var dia = partesData[0];
    dia = dia.toString().length === 1 ? "0" + dia : dia;
    var mes = partesData[1];

    mes = mes.toString().length === 1 ? "0" + mes.toString() : mes;
    var ano = partesData[2];
    ano = ano.toString().length === 2 ? "20" + ano : ano;

    return ano + "-" + mes + "-" + dia + "T00:00:00.000";
  }

  formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
}
