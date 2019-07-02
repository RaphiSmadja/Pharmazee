import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Pharmacy} from '../entities/Pharmacy';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-pharmacy',
  templateUrl: './favorite-pharmacy.component.html',
  styleUrls: ['./favorite-pharmacy.component.css']
})
export class FavoritePharmacyComponent implements OnInit {

  pharmacies: Pharmacy[];
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.aboutMe().subscribe(res => {
      console.log('response: ' + res.msg);
      if (res.msg === 'OK') {
        this.pharmacies = res.result.favorite_pharmacies;
      }
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!updatedAt'},
      {label: 'Oldest First', value: 'updatedAt'},
      {label: 'Status', value: 'status'}
    ];
  }

  details(id: string) {
    this.router.navigate(['pharmacy/' + id]);
  }

}
