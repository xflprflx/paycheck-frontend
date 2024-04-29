import { UploadEventsService } from "src/app/services/upload-events.service";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { PaymentService } from "src/app/services/payment.service";
import { ModelEventService } from "src/app/services/model-event.service";
import { Payment } from "src/app/models/payment";
import { TransportDocument } from "src/app/models/transport-document";
import { DashboardEventService } from "src/app/services/dashboard-event.service";
import { MatDrawer } from "@angular/material/sidenav";
import { NavStateService } from "src/app/services/nav-state.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loading: boolean = false;
  onDashboard: boolean;
  showTableValue: boolean = false;
  transportDocuments: TransportDocument[];
  payments: Payment[];
  @ViewChild("drawer") drawer: MatDrawer;

  constructor(
    private router: Router,
    private uploadEventService: UploadEventsService,
    private dashboardEventService: DashboardEventService,
    private transportDocumentService: TransportDocumentService,
    private modelEventService: ModelEventService,
    private paymentService: PaymentService,
    private navStateService: NavStateService
  ) {}

  ngOnInit(): void {
    this.router.navigate(["dashboard"]);

    this.showTableValue = this.navStateService.showTableValue;

    this.dashboardEventService.onDashboard.subscribe((onDashboard) => {
      this.onDashboard = onDashboard;
    });
    this.uploadEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.dashboardEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.uploadEventService.transportDocumentPosted.subscribe(() => {
      this.transportDocumentService
        .getTransportDocuments()
        .subscribe((response) => {
          this.transportDocuments = response;
          this.modelEventService.transportDocuments.emit(
            this.transportDocuments
          );
        });
    });
    this.uploadEventService.paymentDocumentPosted.subscribe(() => {
      this.paymentService.getPayments().subscribe((response) => {
        this.payments = response;
        this.modelEventService.payments.emit(this.payments);
      });
    });
  }

  showTable() {
    if (!this.showTableValue) {
      this.loading = true;
      this.showTableValue = true;
    } else {
      this.showTableValue = false;
    }
    this.navStateService.showTableValue = this.showTableValue;
  }
}
