import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  
  file: any;

  constructor() { }

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    console.log("files", this.file)
  }

  returnFile() {
    console.log("files", this.file)
    return this.file;
  }
}
