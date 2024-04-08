// import { Component, OnInit } from "@angular/core";
// import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
// import * as moment from 'moment'; // Import moment.js for date formatting
// import 'chartjs-plugin-colorschemes'; // Import the plugin

// @Component({
//   selector: "app-timeline",
//   templateUrl: "./timeline.component.html",
//   styleUrls: ["./timeline.component.css"],
// })
// export class TimelineComponent implements OnInit {
//   barChartData: ChartDataSets[] = [];
//   chartLabels: string[] = [];
//   chartType: ChartType = "bar";
//   chartOptions: ChartOptions = {
//     responsive: true,
//     scales: {
//       xAxes: [
//         {
//           stacked: true, // Enable stacking for multiple datasets
//           ticks: {
//             callback: (value: any, index: number, values: any[]) => {
//               // Format x-axis labels as month-year (e.g., Jan-2024)
//               return moment(value).format("MMM-YYYY");
//             },
//           },
//         },
//       ],
//       yAxes: [
//         {
//           stacked: true, // Enable stacking for multiple datasets
//         },
//       ],
//     },
//   };

//   constructor() {}

//   ngOnInit() {
//     const data = [
//       {
//         id: 222,
//         number: "22352",
//         serie: "11",
//         amount: 63.83,
//         addressShipper: "Av. Sertorio",
//         issueDate: "23/01/2024",
//         paymentForecastByScannedDate: "01/03/2024",
//         paymentForecastByPaymentApprovalDate: "01/03/2024",
//         paymentStatus: "Pago no prazo",
//         reasonReduction: "",
//         paymentDTO: {
//           id: 161,
//           number: "22352",
//           serie: "11",
//           invoiceSG: "1900003050",
//           myInvoice: "",
//           docCompensation: "2000005080",
//           amount: 63.83,
//           text: "Fatura Transp. TMS FABIANO CA",
//           paymentDate: "01/03/2024",
//         },
//         invoices: [
//           {
//             id: 232,
//             number: "4342009",
//             deliveryStatus: "Entregue",
//             scannedDate: "12/01/2024",
//             paymentApprovalDate: "12/01/2024",
//           },
//         ],
//       },
//       // ... other data objects
//     ];

//     // Group data by month-year (considering potential null paymentDTO.paymentDate)
//     const groupedData = data.reduce((acc, curr) => {
//       const monthYear = moment(curr.paymentForecastByScannedDate).format(
//         "MMM-YYYY"
//       );
//       acc[monthYear] = acc[monthYear] || {
//         monthYear,
//         paymentForecastByScannedDate: 0,
//         paymentForecastByPaymentApprovalDate: 0,
//         paymentDate: 0,
//       };
//       acc[monthYear].paymentForecastByScannedDate += curr.amount;
//       acc[monthYear].paymentForecastByPaymentApprovalDate += curr.amount;
//       if (curr.paymentDTO && curr.paymentDTO.paymentDate) {
//         acc[monthYear].paymentDate += curr.amount;
//       }
//       return acc;
//     }, {});

//     // Extract labels and datasets from grouped data
//     this.chartLabels = Object.keys(groupedData).sort(); // Ensure labels are sorted chronologically
//     this.barChartData = [
//       {
//         label: "paymentForecastByScannedDate",
//         data: this.chartLabels.map(
//           (monthYear) => groupedData[monthYear].paymentForecastByScannedDate
//         ),
//       },
//       {
//         label: "paymentForecastByApprovalDate",
//         data: this.chartLabels.map(
//           (monthYear) => groupedData[monthYear].paymentForecastByApprovalDate
//         ),
//       },
//       {
//         label: "paymentDate",
//         data: this.chartLabels.map(
//           (monthYear) => groupedData[monthYear].paymentDto.paymentDate
//         ),
//       },
//     ];
//   }
// }
