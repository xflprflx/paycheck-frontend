import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransportDocument } from 'src/app/models/transport-document';
import { TransportDocumentService } from 'src/app/services/transport-document.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  transportDocuments: TransportDocument[] = [];

  displayedColumns: string[] = [
    "number",
    "type",
    "amount",
    "issueDate",
    "invoices",
    "deliveryStatus",
    "scannedDate",
    "paymentForecastByScannedDate",
    "approvalDate",
    "paymentForecastByPaymentApprovalDate",
    "paymentStatus",
    "paymentDate",
    "paymentValue",
    "difference",
    "actions",
  ];

  dataSource = new MatTableDataSource<TransportDocument>(
    this.transportDocuments
  );
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private transportDocumentService: TransportDocumentService
  ) {}

  ngOnInit(): void {
   this.findAll()
  }

  findAll() {
    this.transportDocumentService
      .getTransportDocuments()
      .subscribe((response) => {
        this.transportDocuments = response;
        this.dataSource = new MatTableDataSource<TransportDocument>(response);
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

