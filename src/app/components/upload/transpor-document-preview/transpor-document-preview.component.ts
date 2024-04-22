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
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { UploadEventsService } from "src/app/services/upload-events.service";

import { TransportDocument } from "./../../../models/transport-document";
import { ModelEventService } from "src/app/services/model-event.service";

@Component({
  selector: "app-transpor-document-preview",
  templateUrl: "./transpor-document-preview.component.html",
  styleUrls: ["./transpor-document-preview.component.css"],
})
export class TransporDocumentPreviewComponent implements OnInit {
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
    private toast: ToastrService,
    private uploadEventsService: UploadEventsService,
    private modelEventService: ModelEventService
  ) {}

  ngOnInit(): void {
    this.uploadEventsService.transportDocumentFileSent.subscribe((response) => {
      this.transportDocuments = response;
      this.dataSource.data = this.transportDocuments;
    })

    this.modelEventService.transportDocuments.subscribe((response) => {
      this.transportDocuments = response;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transportDocuments && !changes.transportDocuments.firstChange) {
      if (changes.transportDocuments.currentValue) {
        this.transportDocuments = changes.transportDocuments.currentValue;
        this.dataSource.data = changes.transportDocuments.currentValue;
      }
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  postTransportDocuments() {
    this.uploadEventsService.isLoading.emit(true);
    this.transporteDocumentService
      .postTransportDocumentList(this.transportDocuments)
      .subscribe(
        (response) => {
          this.toast.success(response, "Sucesso");
          this.transportDocuments = null;
          this.uploadEventsService.documentPosted.emit();
          this.uploadEventsService.transportDocumentPosted.emit();
          this.uploadEventsService.isLoading.emit(false);
        },
        (error) => {
          this.toast.error(error.error);
          this.uploadEventsService.isLoading.emit(false);
        }
      );
  }
}
