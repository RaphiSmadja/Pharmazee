import { Component, OnInit } from '@angular/core';
import {PaymentService} from './payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  sessionId: string;
  private paymentIntent: string;
  private idBucket: any;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    /*this.paymentService.createSession().subscribe(
      (result) => {
        console.log(result);
        this.sessionId = result.msg.id;
        this.paymentIntent = result.msg.payment_intent;
        this.idBucket = result.msg.id;
        console.log('sessionId' + this.sessionId);
        console.log('paymentIntent' + this.paymentIntent);
      }
    );*/
  }

}
