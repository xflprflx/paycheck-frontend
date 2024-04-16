import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UploadEventsService } from "src/app/services/upload-events.service";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"],
})
export class UploaderComponent implements OnInit {
  file: any;
  @Output() fileEvent = new EventEmitter<File>();
  @Input() img: string;

  constructor(private uploadEventsService: UploadEventsService) {}

  ngOnInit(): void {
    this.uploadEventsService.documentPosted.subscribe(() => {
      this.file = null;
    })
  }

  getFile(event: any) {
    this.file = event.target.files[0];
    this.fileEvent.emit(this.file);
  }

  cleanFile() {
    this.file = null;
    this.uploadEventsService.onCleaningFile.emit();
  }
} 
