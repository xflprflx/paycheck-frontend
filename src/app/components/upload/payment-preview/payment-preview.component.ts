import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PdfService } from 'src/app/services/pdf.service';
import { UploadEventsService } from 'src/app/services/upload-events.service';

@Component({
  selector: 'app-payment-preview',
  templateUrl: './payment-preview.component.html',
  styleUrls: ['./payment-preview.component.css']
})
export class PaymentPreviewComponent implements OnInit {
  @Input()
  file: any
  loading: boolean = false;

  constructor(private pdfService: PdfService, private toast: ToastrService, private uploadEventsService: UploadEventsService) { }

  ngOnInit(): void {
  }

  postPayments() {
    this.loading = true;
    this.pdfService
      .uploadFile(this.file)
      .subscribe(
        (response) => {
          this.toast.success(response, "Sucesso");
          this.file = null;
          this.uploadEventsService.documentPosted.emit();
          this.loading = false;
        },
        (error) => {
          this.toast.error(error.error);
          this.loading = false;
        }
      );
  }
}
