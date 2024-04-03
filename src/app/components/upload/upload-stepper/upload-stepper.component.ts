import { Component, OnInit } from "@angular/core";
import { Invoice } from "src/app/models/invoice";
import { TransportDocument } from "src/app/models/transport-document";
import { ExcelService } from "src/app/services/excel.service";

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

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  constructor(private excelService: ExcelService) {}

  ngOnInit() {}

  async receiveFile(file: File, doc: string) {
    this.file = file;
    console.log(file.type)
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
    } else {
      console.error("Tipo de arquivo não suportado:", file.type);
    }

    if(file.type === "application/pdf"){

    }

  }
}
