import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BucketService} from '../services/bucket.service';
import {Bucket} from '../entities/Bucket';
import {Product} from '../entities/Product';
import {Orders} from '../entities/Orders';
import {OrderService} from '../services/order.service';
import {AuthService} from '../auth/auth.service';
import {enumOrderStatus} from '../entities/enumOrderStatus';
import {Router} from '@angular/router';
import {ListProductOrder} from '../entities/ListProductOrder';
import {PaymentService} from '../payment/payment.service';
import {Line_item} from '../entities/line_item';
import {PanelModule} from 'primeng/panel';
import {ProductService} from '../services/products.service';
import {ListproductorderService} from '../services/listproductorder.service';

declare var stripe: any;
declare function checkoutPay(sessionId): string;

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  private idBucket: any;
  sessionId: any;
  private paymentIntent: any;
  constructor(private bucketService: BucketService,
              private orderService: OrderService,
              private productService: ProductService,
              private listproductorderService: ListproductorderService,
              private authService: AuthService,
              private paymentService: PaymentService,
              private router: Router) {
  }
  // private list_item: any = {};
  // tslint:disable-next-line:variable-name
  private line_items: Line_item [] = [];
  // private line_items: any [] = [];
  bucket: Bucket;
  listProduct: number [] = null;
  order: Orders = {id: 0, id_stripe: null, id_pharmacy: 0, nbloyalty: 0, totalprice: 0,
    status: enumOrderStatus.Paymentpending, id_user: 0, updatedAt: null, createdAt: null, products: null};
  totalprice: number;
  private session: any;
  private listproductorder: ListProductOrder = {id: 0, id_order: 0, id_product: 0, quantity: 0};
  ngOnInit() {
    if (!this.bucketService.isEmpty()) {
      this.bucket = this.bucketService.bucket;
    } else {
      this.bucketService.bucketObservable.subscribe((x: any) => {
        console.log(x);
        this.bucket = x;
      });
    }

    this.totalprice = 0;

    for (const prod of Array.from(this.bucket.prodMap.keys())) {
      this.totalprice += this.bucket.listProduct.get(prod).price * this.bucket.prodMap.get(prod);
      this.totalprice = Math.round(this.totalprice * 100) / 100;
    }

    this.listProduct = Array.from(this.bucket.prodMap.keys());
  }

  delete(product: number) {
    if (this.bucket.cpt > 0) {
      this.bucket.cpt -= this.bucket.prodMap.get(product);
    }
    this.totalprice -= this.bucket.listProduct.get(product).price * this.bucket.prodMap.get(product);
    this.totalprice = Math.round(this.totalprice * 100) / 100;
    this.bucket.prodMap.delete(product);
    this.listProduct = Array.from(this.bucket.prodMap.keys());
    this.bucketService.cryptBucket();
    console.log(this.bucket);
  }

  addProd(product: number) {
      this.bucket.prodMap.set(product, this.bucket.prodMap.get(product) + 1);
      this.bucket.cpt ++;
      this.totalprice += this.bucket.listProduct.get(product).price;
      this.totalprice = Math.round(this.totalprice * 100) / 100;
      this.bucketService.cryptBucket();
  }

  reduceProd(product: number) {
    if (this.bucket.prodMap.get(product) > 1) {
      this.bucket.prodMap.set(product, this.bucket.prodMap.get(product) - 1);
    } else {
      this.bucket.prodMap.delete(product);
      this.listProduct = Array.from(this.bucket.prodMap.keys());
    }
    if (this.bucket.cpt > 0) {
      this.bucket.cpt --;
    }
    if (this.totalprice > 0) {
      this.totalprice -= this.bucket.listProduct.get(product).price;
    } else {
      this.totalprice = 0;
    }
    this.totalprice = Math.round(this.totalprice * 100) / 100;
    this.bucketService.cryptBucket();
  }

  passOrder() {
    // this.order.id_pharmacy = this.bucket.pharmacy.id;
    this.order.id_pharmacy = this.bucket.pharmacy.id;
    // this.order.id_user = this.session[];
    // this.order.id_user = 1;
    this.order.nbloyalty = Math.round(this.totalprice);
    this.order.status = enumOrderStatus.Paymentpending;
    this.order.totalprice = Math.round(this.totalprice * 100) / 100;


    for (const prod of Array.from(this.bucket.prodMap.keys())) {
      this.line_items.push(new Line_item(this.bucket.listProduct.get(prod).name,
        this.bucket.listProduct.get(prod).description,
        new Array(this.bucket.listProduct.get(prod).picture1),
        this.bucket.listProduct.get(prod).price * 100, 'eur', this.bucket.prodMap.get(prod)));
    }
    console.log(this.line_items);
    this.paymentService.createSession(this.line_items).subscribe(
      (result) => {
        console.log('dsqdqsdqsdqsdq::::::::' + result.msg);
        this.sessionId = result.msg;
        this.paymentIntent = result.msg.payment_intent;
        console.log('sessionId' + this.sessionId.id);
        console.log('paymentIntent' + this.paymentIntent);
        this.order.id_stripe = this.paymentIntent;
        this.orderService.create(this.order).subscribe(res => {
          console.log('res.msg-------------::::::' + res.msg);
          if (res.msg === 'OK') {
            console.log('res.result-------------::::::' + res.result.id);
            for (const prod of Array.from(this.bucket.prodMap.keys())) {
              this.listproductorder.quantity = this.bucket.prodMap.get(prod);
              this.listproductorderService.createListProductOrder(this.bucket.listProduct.get(prod).id.toString(),
                res.result.id, this.listproductorder).subscribe(list => {
                console.log('lisssssssssssssst::::::::' + list.msg);
                console.log('lisssssssssssssst::::::::' + list.resultCode);
                console.log('lisssssssssssssst::::::::' + list.result);
              });
            }
            /*this.router.navigate(['order-detail/' + res.result.id.toString()]);*/
          } else {
            if (res.result === 'Unauthorized') {
              this.authService.logout();
            }
            console.log('res.error msg-------------::::::' + res.result);
          }
        });


        checkoutPay(this.sessionId.id);
      }
    );

  }
}
