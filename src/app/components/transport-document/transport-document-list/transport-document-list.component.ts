import { Invoice } from "./../../../models/invoice";
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
      cnpjShipper: "19199889000106",
      issueDate: new Date("2024-01-01T00:00:00.000Z"),
      paymentForecast: new Date("2024-03-01"),
      paymentDate: new Date("2024-03-01"),
      paymentStatus: "Pago no Prazo",
      invoices: [
        {
          id: "1",
          number: "147",
          deliveryStatus: "Entregue",
          scannedDate: new Date("2024-01-01T00:00:00.000Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          number: "258",
          deliveryStatus: "Entregue",
          scannedDate: new Date("2024-01-01T00:00:00.000Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "1",
      number: "123",
      serie: "1",
      amount: 125.02,
      cnpjShipper: "19199889000106",
      issueDate: new Date("2024-01-01T00:00:00.000Z"),
      paymentForecast: new Date("2024-03-01"),
      paymentDate: new Date("2024-03-01"),
      paymentStatus: "Pago no Prazo",
      invoices: [
        {
          id: "1",
          number: "147",
          deliveryStatus: "Entregue",
          scannedDate: new Date("2024-01-01T00:00:00.000Z"),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
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

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
