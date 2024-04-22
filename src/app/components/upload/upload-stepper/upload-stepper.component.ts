import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Invoice } from "src/app/models/invoice";
import { Payment } from "src/app/models/payment";
import { TransportDocument } from "src/app/models/transport-document";
import { DateUtilService } from "src/app/services/date-utils.service";
import { ExcelService } from "src/app/services/excel.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { PaymentService } from "src/app/services/payment.service";
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { UploadEventsService } from "src/app/services/upload-events.service";

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
        x.scannedDate =
          x.scannedDate != undefined
            ? this.dateUtilService.stringToDate(x.scannedDate).toISOString()
            : undefined;
        x.paymentApprovalDate =
          x.paymentApprovalDate != undefined
            ? this.dateUtilService
                .stringToDate(x.paymentApprovalDate)
                .toISOString()
            : undefined;
      });
    });

    this.uploadEventsService.transportDocumentFileSent.subscribe((x) => {
      this.transportDocuments = x;
      this.transportDocuments.map((x) => {
        x.issueDate =
          x.issueDate != undefined
            ? this.dateUtilService.stringToDate(x.issueDate).toISOString()
            : undefined;
        x.paymentForecastByScannedDate =
          x.paymentForecastByScannedDate != undefined
            ? this.dateUtilService
                .stringToDate(x.paymentForecastByScannedDate)
                .toISOString()
            : undefined;
        x.paymentForecastByPaymentApprovalDate =
          x.paymentForecastByPaymentApprovalDate != undefined
            ? this.dateUtilService
                .stringToDate(x.paymentForecastByPaymentApprovalDate)
                .toISOString()
            : undefined;
      });
    });

    this.uploadEventsService.paymentFileSent.subscribe((x) => {
      this.payments = x;
      this.payments.map((x) => {
        x.paymentDate =
          x.paymentDate != undefined
            ? this.dateUtilService.stringToDate(x.paymentDate).toISOString()
            : undefined;
      });
    });
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
      this.sendFileAndGetPaymentList(file);
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
    this.transportDocumentService
      .sendFileAndGetTransportDocumentList(file)
      .subscribe(
        (response) => {
          this.uploadEventsService.transportDocumentFileSent.emit(response);
          this.uploadEventsService.isLoading.emit(false);
        },
        (error) => {
          this.toast.error(error.error);
          this.uploadEventsService.isLoading.emit(false);
        }
      );
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
