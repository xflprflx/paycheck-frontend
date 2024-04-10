import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Specification } from "src/app/models/specification";
import { TransportDocument } from "src/app/models/transport-document";
import { DeleteComponent } from "./delete/delete.component";
import { TransportDocumentUpdateComponent } from "./transport-document-update/transport-document-update.component";
import { UnlockComponent } from "./unlock/unlock.component";
import { DashboardEventService } from "src/app/services/dashboard-event.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input()
  transportDocuments: TransportDocument[] = []

  isPaid: boolean;

  @Output()
  onUpdateTable = new EventEmitter<Specification>();

  @Input() specification: Specification;

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
    this.transportDocuments,
  );

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private dashboardEventService: DashboardEventService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dashboardEventService.onConfirmeDialog.subscribe((response) => {
      if(this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      }
      this.dashboardEventService.onUpdateTable.emit(new Specification());
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transportDocuments && changes.transportDocuments.currentValue) {
      this.dataSource.data = changes.transportDocuments.currentValue;
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.paginator = this.paginator;
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
      if(this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      } else {
        this.dashboardEventService.onUpdateTable.emit(new Specification());
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  unlockPayment(transportDocument: TransportDocument) {
    const dialogRef = this.dialog.open(UnlockComponent, {
      width: "500px",
      height: "450px",
      data: { transportDocument: transportDocument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      } else {
        this.dashboardEventService.onUpdateTable.emit(new Specification());
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(transportDocument: TransportDocument) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: "500px",
      height: "480px",
      data: { transportDocument: transportDocument },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      } else {
        this.dashboardEventService.onUpdateTable.emit(new Specification());
      }
      this.dataSource.paginator = this.paginator;
    });
  }
}
