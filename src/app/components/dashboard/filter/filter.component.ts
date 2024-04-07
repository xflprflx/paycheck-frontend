import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

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

  range = new FormGroup({
    issueStart: new FormControl(),
    issueEnd: new FormControl(),
    scannedStart: new FormControl(),
    scannedEnd: new FormControl(),
    forecastScStart: new FormControl(),
    forecastScEnd: new FormControl(),
    forecastApprStart: new FormControl(),
    forecastApprEnd: new FormControl(),
    approvalStart: new FormControl(),
    approvalEnd: new FormControl(),
    paymentStatus: new FormControl(),
    paymentStart: new FormControl(),
    paymentEnd: new FormControl(),
  });

  issuePicker: any;
  scannedPicker: any;
  forecastScPicker: any;
  forecastApprPicker: any;
  approvalPicker: any;
  paymentPicker: any;


  selectedValue: number;
  paymentStatuses: PaymentStatus[] = [
    { value: 0, viewValue: "Pago no prazo" },
    { value: 1, viewValue: "Pago em atraso" },
    { value: 2, viewValue: "Pendente no prazo" },
    { value: 3, viewValue: "Pendente em atraso" },
    { value: 4, viewValue: "Aprovação pendente" },
    { value: 5, viewValue: "Digitalização pendente" },
    { value: 6, viewValue: "Pagamento abatido" },
  ];

  constructor() {}

  ngOnInit(): void {}
}
