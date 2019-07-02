import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Orders} from '../entities/Orders';
import {OrderService} from '../services/order.service';
import {Pharmacy} from '../entities/Pharmacy';
import {PharmacyService} from '../pharmacy/pharmacy.service';
import {PaymentService} from '../payment/payment.service';
import {Product} from '../entities/Product';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ListProductOrder} from '../entities/ListProductOrder';
import {UserService} from '../auth/user.service';
import {User} from '../entities/User';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  private id: string;
  order: Orders;
  pharmacy: Pharmacy;
  user: User;
  private listsProductOrder: ListProductOrder[] = [];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private pharmacyService: PharmacyService,
              private paymentService: PaymentService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      this.id = params.id;
      this.orderService.listOne(Number(this.id)).subscribe(res => {
        if (res.msg === 'OK') {
          console.log('haaaaaaaaaa::::::::' + res.result.id);
          this.order = res.result;
          // @ts-ignore
          console.log('paaaaaaaaaa::::::::' + this.order.products[0].Listproductorder.quantity);
          this.pharmacyService.listPharmacyById(this.order.id_pharmacy).subscribe(pharma => {
            if (pharma.msg === 'NOK') {
              this.router.navigate(['/not-found']);
            } else {
              this.pharmacy = pharma.result;
            }
          }, error => console.error(error),
            () => console.log('onComplet'));

          this.userService.listUserById(this.order.id_user).subscribe(usr => {
            console.log(usr);
            console.log('usr::::::::::::' + usr);
            if (usr.msg === 'OK') {
              this.user = usr.result;
            } else {
              console.log('Error:' + usr.result);
            }
          });
        } else {
            console.log('res error: ' + res.result);
          }
        }
      );
    });
  }

  payOrder() {

  }

}
