import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Payment } from "src/app/models/payment";
import { PaymentService } from "src/app/services/payment.service";
import { PdfService } from "src/app/services/pdf.service";
import { UploadEventsService } from "src/app/services/upload-events.service";

@Component({
  selector: "app-payment-preview",
  templateUrl: "./payment-preview.component.html",
  styleUrls: ["./payment-preview.component.css"],
})
export class PaymentPreviewComponent implements OnInit {

  payments: Payment[] = [];

  displayedColumns: string[] = ["number", "serie", "paymentDate", "amount"];

  dataSource = new MatTableDataSource<Payment>(this.payments);


  constructor(
    private paymentService: PaymentService,
    private toast: ToastrService,
    private uploadEventsService: UploadEventsService
  ) {}

  ngOnInit(): void {
    this.uploadEventsService.paymentFileSent.subscribe((response) => {
      this.payments = response;
      this.dataSource.data = this.payments;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.payments && !changes.payments.firstChange) {
      if (changes.payments.currentValue) {
        this.dataSource.data = changes.payments.currentValue;
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  postPayments() {
    this.uploadEventsService.isLoading.emit(true);
    this.paymentService.postPaymentList(this.payments).subscribe(
      (response) => {
        this.toast.success(response, "Sucesso");
        this.payments = null;
        this.uploadEventsService.documentPosted.emit();
        this.uploadEventsService.paymentDocumentPosted.emit();
        this.uploadEventsService.isLoading.emit(false);
      },
      (error) => {
        this.toast.error(error.error);
        this.uploadEventsService.isLoading.emit(false);
      }
    );
  }
}
