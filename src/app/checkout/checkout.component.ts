import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PaymentService} from '../payment/payment.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],

})
export class CheckoutComponent implements OnInit {
  private client_secret: string;
  private idBucket: any;
/*  stripe = Stripe('pk_test_n8nR4oFHfsPWR78a3uyh8Jov00mWHeze1z');*/

  constructor(private paymentService: PaymentService, private auth: AuthService) { }

  handler: any;
  amount: number = 500;

  ngOnInit() {
    this.paymentService.createIntent(this.amount).subscribe(
      (result) => {
        console.log(result);
        this.client_secret = result.msg.client_secret;
        console.log('this.client_secret' + this.client_secret);
      }
    );

    /*this.paymentService.createSession().subscribe(
      (result) => {
        console.log(result);
        this.client_secret = result.msg.client_secret;
        this.idBucket = result.msg.id;
        console.log('this.client_secret' + this.client_secret);
      }
    );*/
  }

}
