import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Payment } from "src/app/models/payment";
import { Specification } from "src/app/models/specification";
import { TransportDocument } from "src/app/models/transport-document";
import { ConfigService } from "src/app/services/config.service";
import { DashboardEventService } from "src/app/services/dashboard-event.service";
import { DashboardService } from "src/app/services/dashboard.service";

import { DashboardProjection } from "./../../models/dashboard-projection";
import { ToastrService } from "ngx-toastr";
import { NavStateService } from "src/app/services/nav-state.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  transportDocuments: TransportDocument[] = [];
  specification: Specification;
  pendingAmountValue: number;
  paidAmountValue: number;
  debateAmountValue: number;
  scannedLeadTimeValue: number;
  scannedLeadTimeLabel: string;
  approvalLeadTimeValue: number;
  approvalLeadTimeLabel: string;
  paymentLeadTimeValue: number;
  paymentLeadTimeLabel: string;
  payments: Payment[] = [];
  config: number;
  isLoading: boolean;
  showTable: boolean;

  constructor(
    private dashboardEventService: DashboardEventService,
    private configService: ConfigService,
    private dashboardService: DashboardService,
    private toast: ToastrService,
    private navStateService: NavStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.navStateService.showTableValue$.subscribe((showTable) => {
      setTimeout(() => {
        this.showTable = showTable;
        this.cdr.detectChanges();
      });
    });

    this.dashboardEventService.onUpdatePaymentTerms.subscribe(
      (response) => (this.config = response)
    );
    this.dashboardEventService.onUpdateTable.subscribe(() => this.getAll());

    this.getAll();

    this.isLoading = false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dashboardEventService.onDashboard.emit(true);
    });
  }

  getAll() {
    this.configService.getPaymentTerms().subscribe((response) => {
      this.config = response;
    });
    this.dashboardService.getDashboardProjection().subscribe((response) => {
      this.mountDashboardProjection(response);
    });
  }

  specDashboard(spec: Specification) {
    this.specification = spec;
    this.dashboardService.getDashboardProjectionFiltered(spec).subscribe(
      (response) => {
        this.mountDashboardProjection(response);
      },
      (error) => {
        this.toast.info(error.error.message);
        this.mountEmptyDashboardProjection();
      }
    );
  }

  mountDashboardProjection(dashboardProjection: DashboardProjection) {
    this.payments = dashboardProjection.payments;
    this.transportDocuments = dashboardProjection.transportDocuments;
    this.pendingAmountValue = dashboardProjection.pendingAmountValue;
    this.paidAmountValue = dashboardProjection.paidAmountValue;
    this.debateAmountValue = dashboardProjection.debateAmountValue;
    this.scannedLeadTimeValue = dashboardProjection.scannedLeadTimeValue;
    this.scannedLeadTimeLabel = this.scannedLeadTimeValue > 1 ? "dias" : "dia";
    this.approvalLeadTimeValue = dashboardProjection.approvalLeadTimeValue;
    this.approvalLeadTimeLabel =
      this.approvalLeadTimeValue > 1 ? "dias" : "dia";
    this.paymentLeadTimeValue = dashboardProjection.paymentLeadTimeValue;
    this.paymentLeadTimeLabel = this.paymentLeadTimeValue > 1 ? "dias" : "dia";
    setTimeout(() => {
      this.dashboardEventService.initDash.emit(this.transportDocuments);
    });
  }

  mountEmptyDashboardProjection() {
    this.payments = [];
    this.transportDocuments = [];
    this.pendingAmountValue = 0.0;
    this.paidAmountValue = 0.0;
    this.debateAmountValue = 0.0;
    this.scannedLeadTimeValue = 0;
    this.scannedLeadTimeLabel = "dias";
    this.approvalLeadTimeValue = 0;
    this.approvalLeadTimeLabel = "dias";
    this.paymentLeadTimeValue = 0;
    this.paymentLeadTimeLabel = "dias";
    setTimeout(() => {
      this.dashboardEventService.initDash.emit(this.transportDocuments);
    });
  }
}
