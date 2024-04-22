import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Payment } from "src/app/models/payment";
import { TransportDocument } from "src/app/models/transport-document";
import { DateUtilService } from "src/app/services/date-utils.service";
import { PaymentService } from "src/app/services/payment.service";
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { UploadEventsService } from "src/app/services/upload-events.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"],
})
export class UploaderComponent implements OnInit {
  file: any;
  @Output() fileEvent = new EventEmitter<File>();
  @Input() img: string;

  transportDocuments: TransportDocument[];

  mostRecentIssueDate: string;

  minNumberSerie11: string;
  minNumberSerie1: string;
  maxNumberSerie11: string;
  maxNumberSerie1: string;

  minNumberNfseByPendingInvoice: string;
  minDateNfseByPendingInvoice: string;
  maxNumberNfseByPendingInvoice: string;
  maxDateNfseByPendingInvoice: string;

  minNumberCteByPendingInvoice: string;
  minDateCteByPendingInvoice: string;
  maxNumberCteByPendingInvoice: string;
  maxDateCteByPendingInvoice: string;

  mostRecentIssueDateByInvoice: string;
  mostOldestIssueDateByInvoice: string;

  today: string = this.dateUtilService.formatDate(new Date());

  constructor(
    private uploadEventsService: UploadEventsService,
    private transportDocumentService: TransportDocumentService,
    private dateUtilService: DateUtilService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.uploadEventsService.documentPosted.subscribe(() => {
      this.file = null;
    });

    this.transportDocumentService
      .getTransportDocuments()
      .subscribe((response) => {
        this.transportDocuments = response;
        this.mostRecentIssueDate = this.getLatestIssueDate(response);
        this.mostRecentIssueDateByInvoice =
          this.getLatestPendingDeliveryIssueDate(response);
        this.mostOldestIssueDateByInvoice =
          this.getOldestPendingDeliveryIssueDate(response);
        const transportDocumentNFSE = response.filter(x => x.serie === "1");
        const transportDocumentCTE = response.filter(x => x.serie === "11");

        this.minNumberNfseByPendingInvoice = this.getOldestPending(transportDocumentNFSE).doc;
        this.minDateNfseByPendingInvoice = this.getOldestPending(transportDocumentNFSE).date;
        this.maxNumberNfseByPendingInvoice = this.getLatestPending(transportDocumentNFSE).doc;
        this.maxDateNfseByPendingInvoice = this.getLatestPending(transportDocumentNFSE).date;

        this.minNumberCteByPendingInvoice = this.getOldestPending(transportDocumentCTE).doc;
        this.minDateCteByPendingInvoice = this.getOldestPending(transportDocumentCTE).date;
        this.maxNumberCteByPendingInvoice = this.getLatestPending(transportDocumentCTE).doc;
        this.maxDateCteByPendingInvoice = this.getLatestPending(transportDocumentCTE).date;

        this.paymentService.getPaymentsWithoutDoc().subscribe((response) => {
          this.minNumberSerie1 = this.findMinNumberBySerie(response).serie1;
          this.minNumberSerie11 = this.findMinNumberBySerie(response).serie11;
          this.maxNumberSerie1 = this.findMaxNumberBySerie(response).serie1;
          this.maxNumberSerie11 = this.findMaxNumberBySerie(response).serie11;
        });
      });

    this.uploadEventsService.documentPosted.subscribe((x) => {
      this.transportDocumentService
        .getTransportDocuments()
        .subscribe((response) => {
          this.mostRecentIssueDate = this.getLatestIssueDate(response);
          this.mostRecentIssueDateByInvoice =
            this.getLatestPendingDeliveryIssueDate(response);
          this.mostOldestIssueDateByInvoice =
            this.getOldestPendingDeliveryIssueDate(response);
          this.paymentService.getPaymentsWithoutDoc().subscribe((response) => {
            this.minNumberSerie1 = this.findMinNumberBySerie(response).serie1;
            this.minNumberSerie11 = this.findMinNumberBySerie(response).serie11;
            this.maxNumberSerie1 = this.findMaxNumberBySerie(response).serie1;
            this.maxNumberSerie11 = this.findMaxNumberBySerie(response).serie11;
          });
        });
    });
  }

  getLatestIssueDate(transportDocuments) {
    this.mostRecentIssueDate = null;
    if (!transportDocuments || transportDocuments.length === 0) {
      return null;
    }
    const latestIssueDate = transportDocuments.reduce((latestDate, doc) => {
      if (!doc.issueDate) return latestDate;
      if (
        !latestDate ||
        this.dateUtilService.stringToDate(doc.issueDate) >
          this.dateUtilService.stringToDate(latestDate)
      ) {
        return doc.issueDate;
      } else {
        return latestDate;
      }
    }, null);

    return latestIssueDate;
  }

  getLatestPendingDeliveryIssueDate(
    documents: TransportDocument[]
  ): string | undefined {
    this.mostRecentIssueDateByInvoice = null;
    let latestDate;

    for (const doc of documents) {
      if (doc.invoices) {
        for (const invoice of doc.invoices) {
          if (invoice.deliveryStatus === "Pendente") {
            // Case-sensitive check
            const issueDate = this.dateUtilService.stringToDate(doc.issueDate); // Assuming valid date format
            if (!latestDate || issueDate > latestDate) {
              latestDate = issueDate;
            }
          }
        }
      }
    }
    return latestDate != undefined
      ? this.dateUtilService.formatDate(latestDate)
      : null;
  }

  getOldestPendingDeliveryIssueDate(
    documents: TransportDocument[]
  ): string | undefined {
    this.mostOldestIssueDateByInvoice = null;
    let oldestDate;

    for (const doc of documents) {
      for (const invoice of doc.invoices) {
        if (invoice.deliveryStatus === "Pendente") {
          // Case-sensitive check
          const issueDate = this.dateUtilService.stringToDate(doc.issueDate); // Assuming valid date format
          if (!oldestDate || issueDate < oldestDate) {
            oldestDate = issueDate;
          }
        }
      }
    }
    return oldestDate != undefined
      ? this.dateUtilService.formatDate(oldestDate)
      : null;
  }

  getOldestPending(documents: TransportDocument[]): { doc: string; date: string} {
    let dateTemp;
    let docTemp;
    for(const doc of documents) {
      for(const invoice of doc.invoices) {
        if(!invoice.paymentApprovalDate){
          const issueDate = this.dateUtilService.stringToDate(doc.issueDate);
          if(!dateTemp || issueDate < dateTemp) {
            dateTemp = issueDate;
            docTemp = doc.number;
          }
        }
      }
    }
    return {
      doc: docTemp,
      date: dateTemp
    };
  }

  getLatestPending(documents: TransportDocument[]): { doc: string; date: string} {
    let dateTemp;
    let docTemp;
    for(const doc of documents) {
      for(const invoice of doc.invoices) {
        if(!invoice.paymentApprovalDate){
          const issueDate = this.dateUtilService.stringToDate(doc.issueDate);
          if(!dateTemp || issueDate > dateTemp) {
            dateTemp = issueDate;
            docTemp = doc.number;
          }
        }
      }
    }
    return {
      doc: docTemp,
      date: dateTemp
    };
  }

  findMinNumberBySerie(payments: Payment[]): {
    serie11: string;
    serie1: string;
  } {
    const paymentsSerie11 = payments.filter(
      (payment) => payment.serie === "11"
    );
    const paymentsSerie1 = payments.filter((payment) => payment.serie === "1");
    const minNumberSerie11 = this.findMinNumber(paymentsSerie11);
    const minNumberSerie1 = this.findMinNumber(paymentsSerie1);
    return {
      serie11: minNumberSerie11,
      serie1: minNumberSerie1,
    };
  }

  findMinNumber(payments: Payment[]): string {
    let minNumber = "";

    for (const payment of payments) {
      const paymentNumber = parseFloat(payment.number); // Convertendo para número

      if (
        !isNaN(paymentNumber) && // Verifica se é um número válido
        (minNumber === "" || paymentNumber < parseFloat(minNumber))
      ) {
        // Compara com o menor número atual
        minNumber = payment.number;
      }
    }

    return minNumber;
  }

  findMaxNumberBySerie(payments: Payment[]): {
    serie11: string;
    serie1: string;
  } {
    // Filtra os pagamentos por série 11
    const paymentsSerie11 = payments.filter(
      (payment) => payment.serie === "11"
    );

    // Filtra os pagamentos por série 1
    const paymentsSerie1 = payments.filter((payment) => payment.serie === "1");

    // Encontra o maior número de pagamento para a série 11
    const maxNumberSerie11 = this.findMaxNumber(paymentsSerie11);

    // Encontra o maior número de pagamento para a série 1
    const maxNumberSerie1 = this.findMaxNumber(paymentsSerie1);

    return {
      serie11: maxNumberSerie11,
      serie1: maxNumberSerie1,
    };
  }

  findMaxNumber(payments: Payment[]): string {
    let maxNumber = "";

    for (const payment of payments) {
      const paymentNumber = parseFloat(payment.number); // Convertendo para número

      if (
        !isNaN(paymentNumber) && // Verifica se é um número válido
        (maxNumber === "" || paymentNumber > parseFloat(maxNumber))
      ) {
        // Compara com o menor número atual
        maxNumber = payment.number;
      }
    }

    return maxNumber;
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    this.fileEvent.emit(this.file);
  }

  cleanFile() {
    this.file = null;
    this.uploadEventsService.onCleaningFile.emit();
  }
}
