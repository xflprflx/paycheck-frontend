import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"],
})
export class UploaderComponent implements OnInit {
  file: any;
  @Output() fileEvent = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  getFile(event: any) {
    this.file = event.target.files[0];
    this.fileEvent.emit(this.file);
  }
}
