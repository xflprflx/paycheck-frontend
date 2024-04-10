import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TransportDocument } from 'src/app/models/transport-document';

@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.css']
})
export class PreviewPdfComponent implements OnInit {

  transportDocuments: TransportDocument[] = []

  dataSource = new MatTableDataSource<TransportDocument>(
    this.transportDocuments,
  );
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.transportDocuments = this.data.transportDocuments;
  }

}
