import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {Orders} from '../entities/Orders';
import {DataViewModule} from 'primeng/dataview';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pharmacy-orders',
  templateUrl: './pharmacy-orders.component.html',
  styleUrls: ['./pharmacy-orders.component.css']
})
export class PharmacyOrdersComponent implements OnInit {

  orders: Orders[];
  sortOptions: SelectItem[];
  private sortKey: string;
  sortField: string;
  sortOrder: number;
  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.orderService.listMinePharmacy().subscribe(res => {
      console.log(res);
      console.log('res::::::::::::' + res);
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
