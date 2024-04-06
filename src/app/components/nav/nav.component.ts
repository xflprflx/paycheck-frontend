import { UploadEventsService } from 'src/app/services/upload-events.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loading: boolean = false;

  constructor(private router: Router, private uploadEventService: UploadEventsService) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'])
    this.uploadEventService.isLoading.subscribe((loading) => {
      this.loading = loading;
    })
  }

}
