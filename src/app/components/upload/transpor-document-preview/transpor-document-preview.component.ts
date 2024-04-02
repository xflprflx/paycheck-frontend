import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransportDocument } from 'src/app/models/transport-document';

@Component({
  selector: 'app-transpor-document-preview',
  templateUrl: './transpor-document-preview.component.html',
  styleUrls: ['./transpor-document-preview.component.css']
})
export class TransporDocumentPreviewComponent implements OnInit {

  @Input()
  transportDocuments: TransportDocument[];

  displayedColumns: string[] = [
    "number",
    "serie",
    "issueDate",
    "shipper",
    "amount",
    "invoices",
  ];

  dataSource = new MatTableDataSource<TransportDocument>(
   // this.transportDocuments
  );

  constructor() {}

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
