import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  
  file: any;

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    console.log("files", this.file)
  }

  readFile(event: any) {
    this.file = event.target.files[0];
    this.excelService.readFile(this.file);
  }
}
