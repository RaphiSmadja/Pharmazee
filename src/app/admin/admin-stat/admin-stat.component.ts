import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/User';
import {Pharmacy} from '../../entities/Pharmacy';
import {PharmacyService} from '../../pharmacy/pharmacy.service';
import {UserService} from '../../auth/user.service';
import {DatePipe} from '@angular/common';
import {SelectItem} from 'primeng/api';
import {FormBuilder, FormControl} from '@angular/forms';
import {OrderService} from '../../services/order.service';
import {Orders} from 'src/app/entities/Orders';

@Component({
  selector: 'app-admin-stat',
  templateUrl: './admin-stat.component.html',
  styleUrls: ['./admin-stat.component.css']
})
export class AdminStatComponent implements OnInit {

  private userArr: User[];
  private pharmacyArr: Pharmacy[];
  private orderArr: Orders[];
  private userDatas: any[] = [];
  private pharmacyDatas: any[] = [];
  private orderDatas: any [] = [];
  private labels: any[] = [];
  selectedDays: number;
  days: SelectItem[];
  private dayForm;
  data: any;
  private pipe = new DatePipe('en-US');

  constructor(private userService: UserService,
              private pharmacyService: PharmacyService,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
    this.days = [
      {label: '7 jours', value: 7},
      {label: '30 jours', value: 30},
      {label: '90 jours', value: 90}
    ];

    this.selectedDays = 7;
  }

  ngOnInit() {
    this.userService.listAllUser().subscribe(res => {
      if (res.msg === 'OK') {
        this.userArr = res.result;
        this.setLabels();
        this.countUserByDate();
        console.log('User array: ' + this.userArr);
      }
    });

    this.pharmacyService.listAllPharmacy().subscribe(res => {
      if (res.msg === 'OK') {
        this.pharmacyArr = res.result;
        this.setLabels();
        this.countPharmacyByDate();
      }
    });

    this.orderService.listAll().subscribe(res => {
      if (res.msg === 'OK') {
        this.orderArr = res.result;
        this.setLabels();
        this.countOrderByDate();


        this.data = {
          labels: this.labels,
          datasets: [
            {
              label: 'Users',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.userDatas
            },
            {
              label: 'Pharmacies',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: this.pharmacyDatas
            },
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

    this.dayForm = this.formBuilder.group({
      selectedDays: new FormControl('')
    });

  }

  changes() {
    this.countUserByDate();
    this.countPharmacyByDate();
    this.countOrderByDate();
    this.setLabels();
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Users',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.userDatas
        },
        {
          label: 'Pharmacies',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.pharmacyDatas
        },
        {
          label: 'Orders',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: this.orderDatas
        }
      ]
    };
  }

  countUserByDate() {
    let userCount = 0;
    const today = new Date(Date.now());
    this.userDatas = [];
    let daysNow = 0;
    for (let i = 0; i < this.selectedDays; i++) {
      for (const user of this.userArr) {
        if (((today.getDate()) - this.selectedDays + i) < 1) {
          daysNow = ((today.getDate()) - this.selectedDays + i + 30);
        }
        if ((new Date(user.createdAt).getDate()) === daysNow) {
          userCount++;
          console.log('user created: ' + new Date(user.createdAt).getDate());
        }
      }
      console.log('iterator date: ' + (today.getDate() - this.selectedDays + i));
      this.userDatas.push(userCount);
      userCount = 0;
    }
    console.log('userDatas: ' + this.userDatas);
  }

  countPharmacyByDate() {
    let pharmacyCount = 0;
    const today = new Date(Date.now());
    let daysNow = 0;
    this.pharmacyDatas = [];
    for (let i = 1; i <= this.selectedDays; i++) {
      for (const pharma of this.pharmacyArr) {
        if (((today.getDate()) - this.selectedDays + i) < 1) {
          daysNow = ((today.getDate()) - this.selectedDays + i + 30);
        }
        if ((new Date(pharma.createdAt).getDate()) === daysNow) {
          pharmacyCount++;
          console.log('pharmacy created: ' + new Date(pharma.createdAt).getDate());
        }
      }
      console.log('iterator date: ' + (today.getDate() - this.selectedDays + i));
      this.pharmacyDatas.push(pharmacyCount);
      pharmacyCount = 0;
    }
    console.log('pharmacyDatas: ' + this.pharmacyDatas);
  }

  countOrderByDate() {
    let orderCount = 0;
    const today = new Date(Date.now());
    let daysNow = 0;
    this.orderDatas = [];
    for (let i = 1; i <= this.selectedDays; i++) {
      for (const order of this.orderArr) {
        if (((today.getDate()) - this.selectedDays + i) < 1) {
          daysNow = ((today.getDate()) - this.selectedDays + i + 30);
        }
        if ((new Date(order.createdAt).getDate()) === daysNow) {
          orderCount++;
          console.log('order created: ' + new Date(order.createdAt).getDate());
        }
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
