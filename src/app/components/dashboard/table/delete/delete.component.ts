import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransportDocumentService } from 'src/app/services/transport-document.service';
import { UploadEventsService } from 'src/app/services/upload-events.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transportDocumentService: TransportDocumentService,
    private toast: ToastrService,
    private uploadEventService: UploadEventsService
  ) {}

  ngOnInit(): void {
  }

  deletePayment(): void {
    this.uploadEventService.isLoading.emit(true);
    this.transportDocumentService
      .deletePayment(
        this.data.transportDocument.id
      )
      .subscribe((response) => {
        this.toast.success(response, "Sucesso");
        this.uploadEventService.isLoading.emit(false);
      });
      (error) => {
        this.toast.error(error.error);
        this.uploadEventService.isLoading.emit(false);
      }
  }

}
