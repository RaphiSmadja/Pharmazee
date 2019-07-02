import { Component, OnInit } from '@angular/core';
import {User} from '../entities/User';
import {Pharmacy} from '../entities/Pharmacy';
import {UserService} from '../auth/user.service';
import {PharmacyService} from '../pharmacy/pharmacy.service';
// import any = jasmine.any;
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private userArr: User[];
  private pharmacyArr: Pharmacy[];
  data: any;
  data2: any;
  constructor(private userService: UserService, private pharmacyService: PharmacyService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }

  ngOnInit() {
    this.userService.listAllUser().subscribe(res => {
      if (res.msg === 'OK') {
        this.userArr = res.result;
      }
    });

    this.pharmacyService.listAllPharmacy().subscribe(res => {
      if (res.msg === 'OK') {
        this.pharmacyArr = res.result;
      }
    });

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

}
