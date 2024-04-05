import { Component, OnInit } from '@angular/core';
import { TransportDocument } from 'src/app/models/transport-document';
import { TransportDocumentService } from 'src/app/services/transport-document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transportDocuments: TransportDocument[]

  constructor(private transportDocumentService: TransportDocumentService) { }

  ngOnInit(): void {
    this.transportDocumentService.getTransportDocuments().subscribe((response) => {
      this.transportDocuments = response;
      console.log(response)
    })
  }

}
