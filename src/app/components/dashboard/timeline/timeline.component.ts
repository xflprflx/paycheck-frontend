import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Chart } from "chart.js";
import * as moment from "moment"; // Import moment.js for date formatting
import "chartjs-plugin-colorschemes"; // Import the plugin
import { TransportDocument } from "src/app/models/transport-document";
import { Payment } from "src/app/models/payment";
import { PaymentService } from "src/app/services/payment.service";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent implements OnChanges, OnInit {

  @Input() transportDocuments: TransportDocument[];
  @Input() payments: Payment[];
  private barChart: Chart; // Property to store the chart reference

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {

  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes.transportDocuments && changes.transportDocuments.currentValue) {
      this.createBarChart();
    }
  }

  createBarChart() {
    const categoriesTotalPayment = {};
    const categoriesTotalForecastScanned = {};
    const categoriesTotalForecastApproval = {};

    // Iterate over the documents to calculate the sum of each category
    this.transportDocuments.forEach((item) => {
      var forecastScannedDate;
      var forecastApprovalDate;
      var monthYearScanned;
      var monthYearApproval;
      if (item.paymentForecastByScannedDate != null) {
        forecastScannedDate = moment(
          item.paymentForecastByScannedDate,
          "DD/MM/YYYY"
        );
        monthYearScanned = forecastScannedDate.format("MMM-YYYY");
        categoriesTotalForecastScanned[monthYearScanned] =
          (categoriesTotalForecastScanned[monthYearScanned] || 0) + item.amount; // Use item.amount for forecast
      }

      if (item.paymentForecastByPaymentApprovalDate != null) {
        forecastApprovalDate = moment(
          item.paymentForecastByPaymentApprovalDate,
          "DD/MM/YYYY"
        );
        monthYearApproval = forecastApprovalDate.format("MMM-YYYY");
        categoriesTotalForecastApproval[monthYearApproval] =
          (categoriesTotalForecastApproval[monthYearApproval] || 0) +
          item.amount; // Use item.amount for forecast
      }
    });

    this.payments.forEach((item) => {
      var paymentDate
      var monthYearPayment
      if(item.paymentDate != null) {
        paymentDate = moment(item.paymentDate, "DD/MM/YYYY");
  
        monthYearPayment = paymentDate.format("MMM-YYYY");
  
        // Add the document's value to the corresponding category
        categoriesTotalPayment[monthYearPayment] =
          (categoriesTotalPayment[monthYearPayment] || 0) + (item.amount || 0); // Use paymentDTO amount
      }
    });


    // Generate labels and values for each category
    const barLabelsSet = new Set<string>([
      ...Object.keys(categoriesTotalPayment),
      ...Object.keys(categoriesTotalForecastScanned),
      ...Object.keys(categoriesTotalForecastApproval),
    ]);

    const barLabels = Array.from(barLabelsSet).sort((a, b) => moment(a, "MMM-YYYY").valueOf() - moment(b, "MMM-YYYY").valueOf());

    const barAmountsPayment = barLabels.map(
      (key) => parseFloat((categoriesTotalPayment[key] || 0).toFixed(2))
    );
    const barAmountsForecastScanned = barLabels.map(
      (key) => parseFloat((categoriesTotalForecastScanned[key] || 0).toFixed(2))
    );
    const barAmountsForecastApproval = barLabels.map(
      (key) => parseFloat((categoriesTotalForecastApproval[key] || 0).toFixed(2))
    );
    

    const ctx = document.getElementById("bar-chart") as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: barLabels,
        datasets: [
          {
            label: "Montante Pago",
            data: barAmountsPayment,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Montante Previsto pela Digitalização",
            data: barAmountsForecastScanned,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Montante Previsto pela Aprovação",
            data: barAmountsForecastApproval,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              // Remove the stacked option:
              // stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
