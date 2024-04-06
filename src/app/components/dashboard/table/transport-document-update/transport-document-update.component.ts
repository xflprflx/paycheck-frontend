import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransportDocument } from 'src/app/models/transport-document';
import { TransportDocumentService } from 'src/app/services/transport-document.service';

@Component({
  selector: 'app-transport-document-update',
  templateUrl: './transport-document-update.component.html',
  styleUrls: ['./transport-document-update.component.css']
})
export class TransportDocumentUpdateComponent implements OnInit {

  
  transportDocument: TransportDocument = {
    reasonReduction:''
  }
  reasonReductionFormControl: FormControl =  new FormControl(null,  [Validators.required, Validators.minLength(10)]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transportDocumentService: TransportDocumentService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  blockPayment(): void {
    this.transportDocumentService.lockPayment(this.data.transportDocument.id, this.transportDocument.reasonReduction).subscribe(response => {
      this.toast.success(response, "Sucesso");
      this.transportDocument.reasonReduction = null;
    });
  }

  validateFields(): boolean {
    return this.reasonReductionFormControl.valid;
  }
}