import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TransportDocument } from 'src/app/models/transport-document';

@Component({
  selector: "app-preview-pdf",
  templateUrl: "./preview-pdf.component.html",
  styleUrls: ["./preview-pdf.component.css"],
})
export class PreviewPdfComponent implements OnInit {

  displayedColumns: string[] = [
    "number",
    "type",
    "amount",
    "issueDate",
    "paymentForecastByScannedDate",
    "paymentStatus",
    "paymentDate",
    "paymentValue",
    "difference",
  ];
  
  transportDocuments: TransportDocument[] = [];
  
  @ViewChild("content", { static: false }) el!: ElementRef;
  
  dataSource = new MatTableDataSource<TransportDocument>(
    this.transportDocuments
  );
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.transportDocuments = this.data.transportDocuments;
    this.dataSource = new MatTableDataSource<TransportDocument>(
      this.transportDocuments
    );   
  }

  downloadPdf() {
    const doc = new jsPDF("landscape", "px", "a4"); 'l'
    autoTable(doc, { html: "#pdfTable", startY: 20 });
    doc.save("table.pdf");
  }
}
