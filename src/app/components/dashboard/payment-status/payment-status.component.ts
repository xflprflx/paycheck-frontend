import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { TransportDocument } from 'src/app/models/transport-document';
import { DashboardEventService } from 'src/app/services/dashboard-event.service';

@Component({
  selector: "app-payment-status",
  templateUrl: "./payment-status.component.html",
  styleUrls: ["./payment-status.component.css"],
})
export class PaymentStatusComponent implements OnInit {
  @Input()
  transportDocuments: TransportDocument[];
  chartType: ChartType = "pie";
  chartLabels: Label[] = [];
  chartData: number[] = [];
  chartOptions: ChartOptions = {
    tooltips: { enabled: true },
    hover: {
      animationDuration: 0,
    },
    responsive: true,
    legend: {
      position: "right",
    },
    plugins: {
      colorschemes: {
        scheme: "brewer.Paired", // Esquema de cores, você pode escolher outro esquema se preferir
        override: true,
      },
    },
  };

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        "rgb(202, 27, 27)",
        "#6ec411",
        "#145ee9",
        "#e2e914",
        "#a214e9",
        "#302635",
        "#73c4d8",
      ],
    },
  ];

  constructor(private dashEventService: DashboardEventService) {}

  ngOnInit() {
    this.dashEventService.initDash.subscribe((response) => {
      this.transportDocuments = response;
      const groupedData: { [key: string]: number } = {};

      // Agrupando os dados e somando os valores de amount
      this.transportDocuments.forEach((item) => {
        if (groupedData[item.paymentStatus]) {
          groupedData[item.paymentStatus] += item.amount;
        } else {
          groupedData[item.paymentStatus] = item.amount;
        }
      });

      // Convertendo o objeto agrupado em arrays de labels e dados
      this.chartLabels = Object.keys(groupedData);
      //        this.chartData = Object.values(groupedData);
      this.chartData = Object.values(groupedData).map((value) => {
        return parseFloat(value.toFixed(2)); // Converte a string em número
      });
      console.log(this.chartData)
      // Dentro do ngOnInit ou outro método apropriado:
    });
  }
}
