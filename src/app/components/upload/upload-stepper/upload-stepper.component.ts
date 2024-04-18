import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { Payment } from 'src/app/models/payment';
import { TransportDocument } from 'src/app/models/transport-document';
import { DateUtilService } from 'src/app/services/date-utils.service';
import { ExcelService } from 'src/app/services/excel.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PaymentService } from 'src/app/services/payment.service';
import { TransportDocumentService } from 'src/app/services/transport-document.service';
import { UploadEventsService } from 'src/app/services/upload-events.service';

@Component({
  selector: "app-upload-stepper",
  templateUrl: "./upload-stepper.component.html",
  styleUrls: ["./upload-stepper.component.css"],
})
export class UploadStepperComponent implements OnInit {
  isEditable = true;
  isLinear = false;
  file: File;
  transportDocuments: TransportDocument[];
  invoices: Invoice[];
  payments: Payment[];
  loading: boolean = false;

  mostRecentIssueDate: string;
  mostRecentIssueDateByInvoice: string;
  mostOldestIssueDateByInvoice: string;
  paymentWithoutDocs: any[];
  minNumberSerie11: string;
  minNumberSerie1: string;
  maxNumberSerie11: string;
  maxNumberSerie1: string;

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  constructor(
    private excelService: ExcelService,
    private transportDocumentService: TransportDocumentService,
    private dateUtilService: DateUtilService,
    private uploadEventsService: UploadEventsService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.uploadEventsService.onCleaningFile.subscribe(() => {
      this.file = null;
    });
    this.uploadEventsService.invoiceFileSent.subscribe((x) => {
      this.invoices = x;
      this.invoices.map((x) => {
        x.scannedDate = x.scannedDate != undefined ? this.dateUtilService.stringToDate(x.scannedDate).toISOString() : undefined;
        x.paymentApprovalDate = x.paymentApprovalDate != undefined ? this.dateUtilService.stringToDate(x.paymentApprovalDate).toISOString() : undefined;
      });
    });

    this.uploadEventsService.transportDocumentFileSent.subscribe((x) => {
      this.transportDocuments = x;
      this.transportDocuments.map((x) => {
        x.issueDate = x.issueDate != undefined ? this.dateUtilService.stringToDate(x.issueDate).toISOString() : undefined;
        x.paymentForecastByScannedDate = x.paymentForecastByScannedDate != undefined ? this.dateUtilService.stringToDate(x.paymentForecastByScannedDate).toISOString() : undefined;
        x.paymentForecastByPaymentApprovalDate = x.paymentForecastByPaymentApprovalDate != undefined ? this.dateUtilService.stringToDate(x.paymentForecastByPaymentApprovalDate).toISOString() : undefined;
      })
    })

    this.transportDocumentService.getTransportDocuments().subscribe((response) => {
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

    this.uploadEventsService.documentPosted.subscribe((x) => {
      this.transportDocumentService.getTransportDocuments().subscribe((response) => {
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
      if (!minNumber || (payment.number && payment.number < minNumber)) {
        minNumber = payment.number ?? "";
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
      if (payment.number && payment.number > maxNumber) {
        maxNumber = payment.number;
      }
    }

    return maxNumber;
  }

  isExcelFile(file: File): boolean {
    return (
      file.type === "text/csv" ||
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  }

  async receiveFile(file: File, doc: string) {
    this.file = file;
    if (this.isExcelFile(file)) {
      try {
        const data = await this.excelService.readFile(file);
        if (doc === "cte") {
          this.sendFileAndGetTransportDocumentList(file);
        }
        //refactoring
        if (doc === "nf") {
          this.sendFileAndGetInvoiceList(file);
        }
      } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
      }
    } else if (file.type === "application/pdf") {
      this.file = file;
      /*try {
        this.loading = true;
        this.pdfService.uploadFile(file).subscribe(
          (response) => {
            this.toast.success(response, "Sucesso");
            this.loading = false;
          },
          (error) => {
            this.toast.error(error.error);
            this.loading = false;
          }
        );
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }*/
    } else {
      console.error("Tipo de arquivo não suportado:", file.type);
    }
  }

  //refactoring
  sendFileAndGetInvoiceList(file: File) {
    this.uploadEventsService.isLoading.emit(true);
    this.invoiceService.sendFileAndGetInvoiceList(file).subscribe(
      (response) => {
        this.uploadEventsService.invoiceFileSent.emit(response);
        this.uploadEventsService.isLoading.emit(false);
      },
      (error) => {
        this.toast.error(error.error);
        this.uploadEventsService.isLoading.emit(false);
      }
    );
  }

  sendFileAndGetTransportDocumentList(file: File) {
    this.uploadEventsService.isLoading.emit(true);
    this.transportDocumentService.sendFileAndGetTransportDocumentList(file).subscribe(
      (response) => {
        console.log(response);
        this.uploadEventsService.transportDocumentFileSent.emit(response);
        this.uploadEventsService.isLoading.emit(false);
      },
      (error) => {
        this.toast.error(error.error);
        this.uploadEventsService.isLoading.emit(false);
      }
    )
  }

  sendFileAndGetPaymentList(file: File) {
    this.uploadEventsService.isLoading.emit(true);
    this.paymentService.sendFileAndGetPaymentList(file).subscribe(
      (response) => {
        this.uploadEventsService.paymentFileSent.emit(response);
        this.uploadEventsService.isLoading.emit(false);
      },
      (error) => {
        this.toast.error(error.error);
        this.uploadEventsService.isLoading.emit(false);
      }
    );
  }
}
