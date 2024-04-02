import { Component, OnInit } from "@angular/core";
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

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  constructor(private excelService: ExcelService) {}

  ngOnInit() {}

  async receiveFile(file: File) {
    this.file = file;
    if (
      file.type === "text/csv" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      try {
        const data = await this.excelService.readFile(file);
        this.transportDocuments = this.excelService.converterDadosParaTransportDocument(data);
      } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
      }
    } else {
      console.error("Tipo de arquivo não suportado:", file.type);
    }
  }
  
}
