import { Component, Input, OnInit } from '@angular/core';
import { Specification } from 'src/app/models/specification';
import { TransportDocument } from 'src/app/models/transport-document';
import { DashboardEventService } from 'src/app/services/dashboard-event.service';
import { TransportDocumentService } from 'src/app/services/transport-document.service';

import { DateUtilService } from './../../services/date-utils.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  
  transportDocuments: TransportDocument[] = []
  specification: Specification;
  pendingAmountValue: number;
  paidAmountValue: number;
  scannedLeadTimeValue: number;
  scannedLeadTimeLabel: string;
  approvalLeadTimeValue: number;
  approvalLeadTimeLabel: string;

  constructor(
    private transportDocumentService: TransportDocumentService,
    private dateUtilService: DateUtilService,
    private dashboardEventService: DashboardEventService
  ) {}

  ngOnInit(): void {
    this.transportDocumentService
      .getTransportDocuments()
      .subscribe((response) => {
        this.transportDocuments = response;
        this.pendingAmount();
        this.paidAmount();
        this.scannedLeadTime();
        this.approvalLeadTime();
        this.dashboardEventService.initDash.emit(this.transportDocuments);
      });
    this.dashboardEventService.onUpdateTable.subscribe((response) => {
      this.specDashboard(response);
    })
  } 

  specDashboard(spec: Specification) {
    this.specification = spec;
    this.transportDocumentService
      .getTransportDocumentsFiltered(spec)
      .subscribe((response) => {
        this.transportDocuments = response;
        this.pendingAmount();
        this.paidAmount();
        this.scannedLeadTime();
        this.approvalLeadTime();
      });
  }

  pendingAmount() {
    const amount = this.transportDocuments.reduce((amount, obj) => {
      if (
        obj.paymentStatus !== "Pago no prazo" &&
        obj.paymentStatus !== "Pago em atraso"
      ) {
        amount += obj.amount;
      }

      return amount;
    }, 0);

    this.pendingAmountValue = amount;
  }

  paidAmount() {
    const amount = this.transportDocuments.reduce((amount, obj) => {
      if (
        obj.paymentStatus === "Pago no prazo" ||
        obj.paymentStatus === "Pago em atraso"
      ) {
        amount += obj.amount;
      }

      return amount;
    }, 0);

    this.paidAmountValue = amount;
  }

  scannedLeadTime() {
    let totalLeadTime = 0;
    let numberOfLeadTimes = 0;

    this.transportDocuments.forEach((doc) => {
      const issueDate = this.dateUtilService.stringToDate(doc.issueDate);

      doc.invoices.forEach((invoice) => {
        if (invoice.scannedDate) {
          const scannedDate = this.dateUtilService.stringToDate(
            invoice.scannedDate
          );
          const leadTimeInMilliseconds =
            scannedDate.getTime() - issueDate.getTime();

          // Convertendo milissegundos para dias (1 dia = 24 horas * 60 minutos * 60 segundos * 1000 milissegundos)
          const leadTimeInDays = leadTimeInMilliseconds / (24 * 60 * 60 * 1000);

          totalLeadTime += leadTimeInDays;
          numberOfLeadTimes++;
        }
      });
    });
    const averageLeadTime =
      numberOfLeadTimes > 0 ? totalLeadTime / numberOfLeadTimes : 0;
    this.scannedLeadTimeValue = Math.round(averageLeadTime);
    this.scannedLeadTimeLabel =
      Math.round(this.scannedLeadTimeValue) > 1 ? "dias" : "dia";
  }

  approvalLeadTime() {
    let totalLeadTime = 0;
    let numberOfLeadTimes = 0;

    this.transportDocuments.forEach((doc) => {
      doc.invoices.forEach((invoice) => {
        if (invoice.scannedDate && invoice.paymentApprovalDate) {
          const scannedDate = this.dateUtilService.stringToDate(
            invoice.scannedDate
          );
          const approvalDate = this.dateUtilService.stringToDate(
            invoice.paymentApprovalDate
          );
          const leadTimeInMilliseconds =
            approvalDate.getTime() - scannedDate.getTime();

          // Convertendo milissegundos para dias (1 dia = 24 horas * 60 minutos * 60 segundos * 1000 milissegundos)
          const leadTimeInDays = leadTimeInMilliseconds / (24 * 60 * 60 * 1000);

          totalLeadTime += leadTimeInDays;
          numberOfLeadTimes++;
        }
      });
    });

    // Calculando a média do lead time apenas se houver pelo menos uma fatura válida
    const averageLeadTime =
      numberOfLeadTimes > 0 ? totalLeadTime / numberOfLeadTimes : 0;
    // Arredondando para o inteiro mais próximo
    this.approvalLeadTimeValue = Math.round(averageLeadTime);
    this.approvalLeadTimeLabel =
      Math.round(this.scannedLeadTimeValue) > 1 ? "dias" : "dia";
  }
}
