import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {
  @Input()
  invoices: Invoice[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    "number",
    "scannedDate",
    "paymentApprovalDate",
  ];

  dataSource = new MatTableDataSource<Invoice>(
    this.invoices
  );

  constructor(private invoiceService: InvoiceService, private toast: ToastrService) { }

  ngOnInit(): void {
    if(this.invoices) {
      this.dataSource.data = this.invoices;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.invoices && !changes.invoices.firstChange) {
      if (changes.invoices.currentValue) {
        this.dataSource.data = changes.invoices.currentValue;
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  postInvoices() {
    this.loading = true;
    this.invoiceService
      .postInvoiceList(this.invoices)
      .subscribe(
        (response) => {
          this.toast.success(response, "Sucesso");
          this.loading = false;
        },
        (error) => {
          this.toast.error(error.error);
          this.loading = false;
        }
      );
  }
}
