import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UploadEventsService } from 'src/app/services/upload-events.service';

@Component({
  selector: "app-invoice-preview",
  templateUrl: "./invoice-preview.component.html",
  styleUrls: ["./invoice-preview.component.css"],
})
export class InvoicePreviewComponent implements OnInit {

  invoices: Invoice[] = [];

  displayedColumns: string[] = ["number", "scannedDate", "paymentApprovalDate"];

  dataSource = new MatTableDataSource<Invoice>(this.invoices);

  constructor(
    private invoiceService: InvoiceService,
    private toast: ToastrService,
    private uploadEventsService: UploadEventsService
  ) {}

  ngOnInit(): void {

    this.uploadEventsService.invoiceFileSent.subscribe((response) => {
      this.invoices = response;
      this.dataSource.data = this.invoices;
    })

    if (this.invoices) {
      this.dataSource.data = this.invoices;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.invoices && !changes.invoices.firstChange) {
      if (changes.invoices.currentValue) {
        this.invoices = changes.invoices.currentValue
        this.dataSource.data = changes.invoices.currentValue;
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  postInvoices() {
    this.uploadEventsService.isLoading.emit(true);
    this.invoiceService.postInvoiceList(this.invoices).subscribe(
      (response) => {
        this.toast.success(response, "Sucesso");
        this.invoices = null;
        this.uploadEventsService.documentPosted.emit();
        this.uploadEventsService.isLoading.emit(false);
      },
      (error) => {
        this.toast.error(error.error);
        this.uploadEventsService.isLoading.emit(false);
      }
    );
  }
}
