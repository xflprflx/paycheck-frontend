import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-stepper',
  templateUrl: './upload-stepper.component.html',
  styleUrls: ['./upload-stepper.component.css']
})
export class UploadStepperComponent implements OnInit {
  isEditable = true;
  isLinear = false;

  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  constructor() {}

  ngOnInit() {
    
  }


}