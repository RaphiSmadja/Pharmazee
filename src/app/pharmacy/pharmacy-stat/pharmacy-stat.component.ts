import { Component, OnInit } from '@angular/core';
import {Orders} from '../../entities/Orders';
import {SelectItem} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-pharmacy-stat',
  templateUrl: './pharmacy-stat.component.html',
  styleUrls: ['./pharmacy-stat.component.css']
})
export class PharmacyStatComponent implements OnInit {

  private orderArr: Orders[];
  private orderDatas: any [] = [];
  private labels: any[] = [];
  selectedDays: number;
  days: SelectItem[];
  data: any;
  private pipe = new DatePipe('en-US');

  constructor(private orderService: OrderService) {
    this.days = [
      {label: '7 jours', value: 7},
      {label: '30 jours', value: 30},
      {label: '90 jours', value: 90}
    ];

    this.selectedDays = 7;
  }

  ngOnInit() {
    this.orderService.listMinePharmacy().subscribe(res => {
      if (res.msg === 'OK') {
        this.orderArr = res.result;
        this.setLabels();
        this.countOrderByDate();

        this.data = {
          labels: this.labels,
          datasets: [
            {
              label: 'Orders',
              backgroundColor: '#FFCE56',
              borderColor: '#FFCE56',
              data: this.orderDatas
            }
          ]
        };
      }
    });
  }


  changes() {
    this.countOrderByDate();
    this.setLabels();
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Orders',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: this.orderDatas
        }
      ]
    };
  }


  countOrderByDate() {
    let orderCount = 0;
    const today = new Date(Date.now());
    this.orderDatas = [];

    for (let i = 1; i <= this.selectedDays; i++) {
      for (const order of this.orderArr) {
        if ((new Date(order.createdAt).getDate()) === ((today.getDate()) - this.selectedDays + i + 30)) {
          orderCount++;
        }
        console.log('order created: ' + new Date(order.createdAt).getDate());
      }
      console.log('iterator date: ' + (today.getDate() - this.selectedDays + i));
      this.orderDatas.push(orderCount);
      orderCount = 0;
    }
    console.log('orderDatas: ' + this.orderDatas);
  }

  setLabels() {
    const today = new Date(Date.now());
    this.pipe.transform(today.setDate(today.getDate() - this.selectedDays));
    this.labels = [];
    for (let i = 0; i < this.selectedDays; i++) {
      this.labels.push(this.pipe.transform(today.setDate(today.getDate() + 1)));
    }
    console.log('Labels: ' + this.labels);
  }

}
