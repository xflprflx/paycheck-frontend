import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { TransportDocument } from "src/app/models/transport-document";
import { TransportDocumentService } from "src/app/services/transport-document.service";

@Component({
  selector: "app-transpor-document-preview",
  templateUrl: "./transpor-document-preview.component.html",
  styleUrls: ["./transpor-document-preview.component.css"],
})
export class TransporDocumentPreviewComponent implements OnInit {
  @Input()
  transportDocuments: TransportDocument[] = [];

  displayedColumns: string[] = [
    "number",
    "serie",
    "issueDate",
    "addressShipper",
    "amount",
    "invoices",
  ];

  dataSource = new MatTableDataSource<TransportDocument>(
    this.transportDocuments
  );

  constructor(
    private transporteDocumentService: TransportDocumentService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.transportDocuments) {
      this.dataSource.data = this.transportDocuments;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transportDocuments && !changes.transportDocuments.firstChange) {
      if (changes.transportDocuments.currentValue) {
        this.dataSource.data = changes.transportDocuments.currentValue;
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  postTransportDocuments() {
    console.log("post preview");
    this.transporteDocumentService
      .postTransportDocumentList(this.transportDocuments)
      .subscribe(
        (response) => {
          this.toast.success(response, "Sucesso");
          console.log("Resposta", response);
        },
        (error) => {
          this.toast.error(error.error);

          console.log("erro ", error);
        }
      );
  }
}
