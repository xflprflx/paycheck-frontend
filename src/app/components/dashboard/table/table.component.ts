import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TransportDocument } from "src/app/models/transport-document";
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { TransportDocumentUpdateComponent } from "./transport-document-update/transport-document-update.component";
import { UnlockComponent } from "./unlock/unlock.component";
import { DeleteComponent } from "./delete/delete.component";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
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
    public dialog: MatDialog,
    private transportDocumentService: TransportDocumentService
  ) {}

  ngOnInit(): void {
    this.findAll();
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

  blockPayment(transportDocument: TransportDocument) {
    const dialogRef = this.dialog.open(TransportDocumentUpdateComponent, {
      width: "500px",
      height: "450px",
      data: { transportDocument: transportDocument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }

  unlockPayment(transportDocument: TransportDocument) {
    const dialogRef = this.dialog.open(UnlockComponent, {
      width: "500px",
      height: "450px",
      data: { transportDocument: transportDocument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }

  delete(transportDocument: TransportDocument) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: "500px",
      height: "480px",
      data: { transportDocument: transportDocument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }
}
