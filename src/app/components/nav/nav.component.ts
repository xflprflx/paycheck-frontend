import { UploadEventsService } from 'src/app/services/upload-events.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportDocumentService } from 'src/app/services/transport-document.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ModelEventService } from 'src/app/services/model-event.service';
import { Payment } from 'src/app/models/payment';
import { TransportDocument } from 'src/app/models/transport-document';
import { DashboardEventService } from 'src/app/services/dashboard-event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loading: boolean = false;
  showTableValue: boolean = false;
  transportDocuments: TransportDocument[];
  payments: Payment[];

  constructor(
    private router: Router,
    private uploadEventService: UploadEventsService,
    private dashboardEventService: DashboardEventService,
    private transportDocumentService: TransportDocumentService,
    private modelEventService: ModelEventService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.router.navigate(["dashboard"]);
    this.uploadEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.dashboardEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.uploadEventService.transportDocumentPosted.subscribe(() => {
      this.transportDocumentService.getTransportDocuments().subscribe(response => {
        this.transportDocuments = response;
        this.modelEventService.transportDocuments.emit(this.transportDocuments);
      });
    });
    this.uploadEventService.paymentDocumentPosted.subscribe(() => {
      this.paymentService.getPayments().subscribe(response => {
        this.payments = response;
        this.modelEventService.payments.emit(this.payments);
      });
    });
  }

  showTable() {
    if(this.showTableValue == false) {
      this.loading = true;
      this.showTableValue = true;
    } else {
      this.showTableValue = false;
    }
    setTimeout(() => this.dashboardEventService.showTable.emit());
  }
}
