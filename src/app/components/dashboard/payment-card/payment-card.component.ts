import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  value: number;

  @Input()
  color: string;

  @Input() money: boolean;
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
