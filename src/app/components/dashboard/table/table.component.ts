import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Specification } from "src/app/models/specification";
import { TransportDocument } from "src/app/models/transport-document";
import { DeleteComponent } from "./delete/delete.component";
import { TransportDocumentUpdateComponent } from "./transport-document-update/transport-document-update.component";
import { UnlockComponent } from "./unlock/unlock.component";
import { DashboardEventService } from "src/app/services/dashboard-event.service";
import { PreviewPdfComponent } from "./preview-pdf/preview-pdf.component";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { TableModel } from "src/app/models/tablemodel";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input()
  transportDocuments: TransportDocument[] = [];

  @ViewChild(MatTable) table: MatTable<any>;

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
    this.transportDocuments
  );

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private dashboardEventService: DashboardEventService
  ) {}

  ngOnInit(): void {
    this.dashboardEventService.onConfirmeDialog.subscribe((response) => {
      if (this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      }
      this.dashboardEventService.onUpdateTable.emit(new Specification());
    });
   }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dashboardEventService.isLoading.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transportDocuments && changes.transportDocuments.currentValue) {
      this.dataSource.data = changes.transportDocuments.currentValue;
    }
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
      if (this.specification !== undefined) {
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
      if (this.specification !== undefined) {
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
      if (this.specification !== undefined) {
        this.dashboardEventService.onUpdateTable.emit(this.specification);
      } else {
        this.dashboardEventService.onUpdateTable.emit(new Specification());
      }
      this.dataSource.paginator = this.paginator;
    });
  }

  printPdf(transportDocuments: TransportDocument[]) {
    const dialogRef = this.dialog.open(PreviewPdfComponent, {
      width: "1123px",
      height: "794px",
      data: { transportDocuments: transportDocuments },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  downloadPdf() {
    const doc = new jsPDF("l", "px", "a4"); // 'l' para orientação horizontal
    autoTable(doc, { html: "#pdfTable", startY: 20 });
    doc.save("table.pdf");
  }

  exportToExcel(): void {
    const values = this.transportDocuments.map((x) => new TableModel(x));
    const data = values;
    const header = [
      "Número",
      "Tipo",
      "Valor",
      "Emissão",
      "Notas Fiscais",
      "Status Entrega",
      "Digitalização",
      "Prev Pagamento (Dig)",
      "Aprovação",
      "Prev Pagamento (Apr)",
      "Status Pagamento",
      "Pago em",
      "Valor pago",
      "Diferença",
    ];
    const headerRow = {};
    header.forEach((item, index) => {
      headerRow[XLSX.utils.encode_col(index)] = item;
    });

    const dataRows = data.map((obj) => {
      const row = {};
      Object.keys(obj).forEach((key, index) => {
        row[XLSX.utils.encode_col(index)] = obj[key];
      });
      return row;
    });

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      [headerRow, ...dataRows],
      { skipHeader: true }
    );
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");
    XLSX.writeFile(workBook, "Pagamentos.xlsx");
  }
}
