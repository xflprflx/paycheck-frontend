import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { TransportDocument } from "src/app/models/transport-document";

@Component({
  selector: "app-transport-document-list",
  templateUrl: "./transport-document-list.component.html",
  styleUrls: ["./transport-document-list.component.css"],
})
export class TransportDocumentListComponent implements OnInit {
  transportDocuments: TransportDocument[] = [
    {
      id: "1",
      number: "123",
      serie: "1",
      amount: 125.02,
      addressShipper: "19199889000106",
      issueDate: "2024-01-01T00:00:00.000",
      paymentForecast: "2024-01-01T00:00:00.000",
      paymentDate: "2024-01-01T00:00:00.000",
      paymentStatus: "Pago no Prazo",
      invoices: [
        {
          id: "1",
          number: "147",
          deliveryStatus: "Entregue",
        },
        {
          id: "2",
          number: "258",
          deliveryStatus: "Entregue",
        },
      ],
    },
  ];

  displayedColumns: string[] = [
    "number",
    "type",
    "amount",
    "issuedate",
    "paymentforecast",
    "paymentstatus",
    "paymentdate",
    "invoices",
    "actions",
  ];

  dataSource = new MatTableDataSource<TransportDocument>(
    this.transportDocuments
  );

  constructor(private toast: ToastrService) {}

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
