export class Specification {
  issueStart?: string;
  issueEnd?: string;
  scannedStart?: string;
  scannedEnd?: string;
  forecastScStart?: string;
  forecastScEnd?: string;
  forecastApprStart?: string;
  forecastApprEnd?: string;
  approvalStart?: string;
  approvalEnd?: string;
  paymentStart?: string;
  paymentEnd?: string;
  paymentStatus?: number;

  constructor(
    issueStart?: Date,
    issueEnd?: Date,
    scannedStart?: Date,
    scannedEnd?: Date,
    forecastScStart?: Date,
    forecastScEnd?: Date,
    forecastApprStart?: Date,
    forecastApprEnd?: Date,
    approvalStart?: Date,
    approvalEnd?: Date,
    paymentStart?: Date,
    paymentEnd?: Date,
    paymentStatus?: number
  ) {
    const currentDate = new Date();
    this.issueStart =
      this.dateToString(issueStart) ||
      this.dateToString(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 6,
          currentDate.getDate()
        )
      );
    this.issueEnd =
      this.dateToString(issueEnd) || this.dateToString(currentDate);
    this.scannedStart = this.dateToString(scannedStart);
    this.scannedEnd = this.dateToString(scannedEnd);
    this.forecastScStart = this.dateToString(forecastScStart);
    this.forecastScEnd = this.dateToString(forecastScEnd);
    this.forecastApprStart = this.dateToString(forecastApprStart);
    this.forecastApprEnd = this.dateToString(forecastApprEnd);
    this.approvalStart = this.dateToString(approvalStart);
    this.approvalEnd = this.dateToString(approvalEnd);
    this.paymentStart = this.dateToString(paymentStart);
    this.paymentEnd = this.dateToString(paymentEnd);
    this.paymentStatus = paymentStatus;
  }

  dateToString(date: Date): string {
    if (date != null) {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // adiciona um zero à esquerda se o mês for menor que 10
      const day = ("0" + date.getDate()).slice(-2); // adiciona um zero à esquerda se o dia for menor que 10
      //return year + "-" + month + "-" + day + "T00:00:00.000";
      return year + "-" + month + "-" + day;
    }
    return null;
  }
}
