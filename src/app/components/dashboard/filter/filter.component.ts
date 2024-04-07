import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Specification } from "src/app/models/specification";

interface PaymentStatus {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
  panelOpenState = false;
  @Output() onSearchRequest = new EventEmitter<Specification>();

  issueStart: Date;
  issueEnd: Date;
  scannedStart: Date;
  scannedEnd: Date;
  forecastScStart: Date;
  forecastScEnd: Date;
  forecastApprStart: Date;
  forecastApprEnd: Date;
  approvalStart: Date;
  approvalEnd: Date;
  paymentStart: Date;
  paymentEnd: Date;
  paymentStatus: number;

  specification: Specification;

  issuePicker: any;
  scannedPicker: any;
  forecastScPicker: any;
  forecastApprPicker: any;
  approvalPicker: any;
  paymentPicker: any;

  paymentStatuses: PaymentStatus[] = [
    { value: 0, viewValue: "Pago no prazo" },
    { value: 1, viewValue: "Pago em atraso" },
    { value: 2, viewValue: "Pendente no prazo" },
    { value: 3, viewValue: "Pendente em atraso" },
    { value: 4, viewValue: "Aprovação pendente" },
    { value: 5, viewValue: "Digitalização pendente" },
    { value: 6, viewValue: "Pagamento abatido" },
  ];

  issueStartFC = new FormControl();
  issueEndFC = new FormControl();
  scannedStartFC = new FormControl();
  scannedEndFC = new FormControl();
  forecastScStartFC = new FormControl();
  forecastScEndFC = new FormControl();
  forecastApprStartFC = new FormControl();
  forecastApprEndFC = new FormControl();
  approvalStartFC = new FormControl();
  approvalEndFC = new FormControl();
  paymentStartFC = new FormControl();
  paymentEndFC = new FormControl();
  paymentStatusFC = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  closedState() {
    this.panelOpenState = false;
  }

  searchData() {
    this.specification = this.attributesToSpecification();
    this.onSearchRequest.emit(this.specification);
    this.closedState();
  }

  attributesToSpecification(): Specification {
    return new Specification(
      this.issueStart,
      this.issueEnd,
      this.scannedStart,
      this.scannedEnd,
      this.forecastScStart,
      this.forecastScEnd,
      this.forecastApprStart,
      this.forecastApprEnd,
      this.approvalStart,
      this.approvalEnd,
      this.paymentStart,
      this.paymentEnd,
      this.paymentStatus
    );
  }

  clearFilter() {
    this.issueStart = undefined;
    this.issueEnd = undefined;
    this.scannedStart = undefined;
    this.scannedEnd = undefined;
    this.forecastScStart = undefined;
    this.forecastScEnd = undefined;
    this.forecastApprStart = undefined;
    this.forecastApprEnd = undefined;
    this.approvalStart = undefined;
    this.approvalEnd = undefined;
    this.paymentStart = undefined;
    this.paymentEnd = undefined;
    this.paymentStatus = undefined;
  }
}
