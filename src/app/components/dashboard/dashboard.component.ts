import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { Specification } from 'src/app/models/specification';
import { TransportDocument } from 'src/app/models/transport-document';
import { ConfigService } from 'src/app/services/config.service';
import { DashboardEventService } from 'src/app/services/dashboard-event.service';
import { DashboardService } from 'src/app/services/dashboard.service';

import { DashboardProjection } from './../../models/dashboard-projection';

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
  payments: Payment[] = [];
  config: number;
  isLoading: boolean;
  showTable: boolean;

  constructor(
    private dashboardEventService: DashboardEventService,
    private configService: ConfigService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.dashboardEventService.showTable.subscribe(
      () => (this.showTable = !this.showTable)
    );
    this.dashboardEventService.onUpdatePaymentTerms.subscribe(
      (response) => (this.config = response)
    );
    this.dashboardEventService.onUpdateTable.subscribe(() => this.getAll());

    this.getAll();

    this.isLoading = false;
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
    this.dashboardService
      .getDashboardProjectionFiltered(spec)
      .subscribe((response) => {
        this.mountDashboardProjection(response);
      });
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
    setTimeout(() => {
      this.dashboardEventService.initDash.emit(this.transportDocuments);
    });
  }
}
