import { Component, Inject, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { DashboardEventService } from "src/app/services/dashboard-event.service";
import { TransportDocumentService } from "src/app/services/transport-document.service";
import { UploadEventsService } from "src/app/services/upload-events.service";

interface PaymentStatus {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-unlock",
  templateUrl: "./unlock.component.html",
  styleUrls: ["./unlock.component.css"],
})
export class UnlockComponent implements OnInit {

  selectedValue: number;
  paymentStatuses: PaymentStatus[] = [
    { value: 0, viewValue: "Pago no prazo" },
    { value: 1, viewValue: "Pago em atraso" },
    { value: 2, viewValue: "Pendente no prazo" },
    { value: 3, viewValue: "Pendente em atraso" },
    { value: 4, viewValue: "Aprovação pendente" },
    { value: 5, viewValue: "Digitalização pendente" },
  ];

  paymentStatusFormControl: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transportDocumentService: TransportDocumentService,
    private toast: ToastrService,
    private uploadEventService: UploadEventsService,
    private dashboardEventService: DashboardEventService
  ) {}

  ngOnInit(): void {}

  unlockPayment(): void {
    this.uploadEventService.isLoading.emit(true);
    this.transportDocumentService
      .unlockPayment(
        this.data.transportDocument.id,
        this.selectedValue
      )
      .subscribe((response) => {
        this.toast.success(response, "Sucesso");
        this.selectedValue = null;
        this.uploadEventService.isLoading.emit(false);
        this.dashboardEventService.onConfirmeDialog.emit();
      });
      (error) => {
        this.toast.error(error.error);
        this.uploadEventService.isLoading.emit(false);
      }
  }

  validateFields(): boolean {
    return this.paymentStatusFormControl.valid;
  }
}
