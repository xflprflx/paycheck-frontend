import { DashboardEventService } from "./../../services/dashboard-event.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Parameters } from "src/app/models/parameters";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
  paymentTerms: number;

  constructor(
    private configService: ConfigService,
    private toast: ToastrService,
    private dashboardEventService: DashboardEventService
  ) {}

  ngOnInit(): void {
    this.configService
      .getPaymentTerms()
      .subscribe((x) => (this.paymentTerms = x));
  }

  savePaymentTerms(paymentTerms: number) {
    this.configService
      .updatePaymentTerms(new Parameters(1, paymentTerms))
      .subscribe((response) => {
        this.paymentTerms = response.paymentTerms;
        this.dashboardEventService.onUpdatePaymentTerms.emit(this.paymentTerms);
        this.toast.success("Condição de pagamento salva com sucesso!");
      });
  }
}
