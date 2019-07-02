import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {Orders} from '../entities/Orders';
import {DataViewModule} from 'primeng/dataview';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Orders[];
  private sortOptions: SelectItem[];
  private sortKey: string;
  sortField: string;
  sortOrder: number;
  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.orderService.listAllOfUser().subscribe(res => {
      console.log(res);
      if (res.msg === 'OK') {
        this.orders = res.result;
      } else {
        console.log('Error:' + res.result);
      }
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!updatedAt'},
      {label: 'Oldest First', value: 'updatedAt'},
      {label: 'Status', value: 'status'}
    ];
  }

  details(id: string) {
    this.router.navigate(['order-detail/' + id]);
  }

}
