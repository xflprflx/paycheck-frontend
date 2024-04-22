import { UploadEventsService } from 'src/app/services/upload-events.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportDocumentService } from 'src/app/services/transport-document.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ModelEventService } from 'src/app/services/model-event.service';
import { Payment } from 'src/app/models/payment';
import { TransportDocument } from 'src/app/models/transport-document';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loading: boolean = false;
  transportDocuments: TransportDocument[];
  payments: Payment[];

  constructor(
    private router: Router,
    private uploadEventService: UploadEventsService,
    private transportDocumentService: TransportDocumentService,
    private modelEventService: ModelEventService
  ) {}

  ngOnInit(): void {
    this.router.navigate(["dashboard"]);
    this.uploadEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });

    this.uploadEventService.transportDocumentPosted.subscribe(() => {
      this.transportDocumentService.getTransportDocuments().subscribe(response => {
        this.transportDocuments = response;
        this.modelEventService.transportDocuments.emit(this.transportDocuments);
      });
    });
  }

}
