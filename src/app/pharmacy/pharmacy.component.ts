import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {PharmacyService} from './pharmacy.service';
import {Pharmacy} from '../entities/Pharmacy';
import {Bucket} from '../entities/Bucket';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  img1: string;
  img2: string;
  img3: string;
  pharmarray: [Pharmacy];
  constructor(private pharmacyService: PharmacyService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
  }

  getAllPharmacies() {
    this.pharmacyService.listAllPharmacy().subscribe(listofpharma => {
      console.log(listofpharma);
    });
    console.log(this.pharmarray);
  }
}
