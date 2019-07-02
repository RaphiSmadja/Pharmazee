import { Component, OnInit } from '@angular/core';
import {Product} from '../entities/Product';
import {SelectItem} from 'primeng/api';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.css']
})
export class FavoriteProductComponent implements OnInit {
  products: Product[];
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.aboutMe().subscribe(res => {
      console.log('response: ' + res.msg);
      if (res.msg === 'OK') {
        this.products = res.result.favorite_products;
      }
    });

    this.sortOptions = [
      {label: 'Newest First', value: '!updatedAt'},
      {label: 'Oldest First', value: 'updatedAt'},
      {label: 'Status', value: 'status'}
    ];

  }

  details(id: string) {
    this.router.navigate(['product/' + id]);
  }

}
