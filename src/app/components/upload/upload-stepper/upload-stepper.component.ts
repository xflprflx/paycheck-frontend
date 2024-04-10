import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { TransportDocument } from 'src/app/models/transport-document';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: "app-upload-stepper",
  templateUrl: "./upload-stepper.component.html",
  styleUrls: ["./upload-stepper.component.css"],
})
export class UploadStepperComponent implements OnInit {
  isEditable = true;
  isLinear = false;
  file: File;
  transportDocuments: TransportDocument[];
  invoices: Invoice[];
  loading: boolean = false;

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  constructor(private excelService: ExcelService) {}

  ngOnInit() {}

  async receiveFile(file: File, doc: string) {
    this.file = file;
    if (
      file.type === "text/csv" ||
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      try {
        const data = await this.excelService.readFile(file);
        if (doc === "cte") {
          this.transportDocuments =
            this.excelService.converterDadosParaTransportDocument(data);
        } else {
          this.invoices = this.excelService.converterDadosParaInvoice(data);
        }
      } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
      }
    } else if (file.type === "application/pdf") {
      this.file = file;
      /*try {
        this.loading = true;
        this.pdfService.uploadFile(file).subscribe(
          (response) => {
            this.toast.success(response, "Sucesso");
            this.loading = false;
          },
          (error) => {
            this.toast.error(error.error);
            this.loading = false;
          }
        );
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      }*/
    } else {
      console.error("Tipo de arquivo não suportado:", file.type);
    }
  }
}
