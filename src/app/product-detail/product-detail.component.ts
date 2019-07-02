import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Product} from '../entities/Product';
import {GalleriaModule} from 'primeng/galleria';
import {Bucket} from '../entities/Bucket';
import {BucketService} from '../services/bucket.service';
import {UserService} from '../auth/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthService} from '../auth/auth.service';
import {FavoriteProduct} from '../entities/FavoriteProduct';
import {FavoriteproductService} from '../services/favoriteproduct.service';
import {Pharmacy} from '../entities/Pharmacy';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ConfirmationService]
})
export class ProductDetailComponent implements OnInit {

  private id: number;
  product: Product = null;
  images: any[];
  private bucket: Bucket;
  private quantity = 1;
  isFavorite = false;
  private authInfo: any;
  private pharmacy: Pharmacy;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private bucketService: BucketService,
              private userService: UserService,
              private favoriteproductService: FavoriteproductService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      this.id = params.id;
      this.productService.listOne(this.id).subscribe(res => {
        if (res.msg === 'OK') {
          this.product = res.result;
          this.pharmacy = res.result.catalog.pharmacy;
          this.images = [];
          this.images.push({source: res.result.picture1, alt: '', title: res.result.name});
          this.images.push({source: res.result.picture2, alt: '', title: res.result.name});
          this.images.push({source: res.result.picture3, alt: '', title: res.result.name});
        }
      });
    });

    if (!this.bucketService.isEmpty()) {
      this.bucket = this.bucketService.bucket;
    } else {
      this.bucketService.bucketObservable.subscribe((x: Bucket) => {
        this.bucket = x;
      });
    }


    this.favoriteproductService.favoriteProduct(this.id).subscribe(res => {
      if (res.msg === 'OK') {
        if (res.result.count > 0) {
          this.isFavorite = true;
          console.log('stats: ' + this.isFavorite);
        }
      }
    }, error => console.error(error),
      () => console.log('onComplet'));
  }

  addProd() {
    this.quantity += 1;
  }

  reduceProd() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addProds(product: number) {
    if (this.bucket.pharmacy.id !== this.pharmacy.id) {

      if (this.bucket.cpt > 0) {

        this.confirmationService.confirm({
          message: 'Il exist des produits d\'un autre pharmacy dans votre panier,\nvoulez-vous vider votre panier et ajouter ce produit?',
          header: 'Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.bucket.pharmacy = this.pharmacy;
            this.bucket.listProduct.clear();
            this.bucket.prodMap.clear();
            this.bucket.cpt = 0;

            this.productService.listAllByPharmacy(this.pharmacy.id.toString()).subscribe(res => {
              console.log('response list all by pharmacy: ' + res.msg);
              console.log('response result list all by pharmacy: ' + res.result);
              if (res.msg === 'OK') {
                for (const prod of res.result) {
                  this.bucket.listProduct.set(prod.id, prod);
                }

                if (this.bucket.prodMap.get(product) === undefined) {
                  this.bucket.prodMap.set(product, this.quantity);
                } else {
                  this.bucket.prodMap.set(product, this.bucket.prodMap.get(product) + this.quantity);
                }
                this.bucket.cpt += this.quantity;
                this.bucketService.cryptBucket();
              }
            });

          },
          reject: () => {
            this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'Vous avez annulé l\'ajout de produit au panier'});
          }
        });

      } else {

        this.bucket.pharmacy = this.pharmacy;
        this.bucket.listProduct.clear();
        this.bucket.prodMap.clear();
        this.bucket.cpt = 0;

        this.productService.listAllByPharmacy(this.pharmacy.id.toString()).subscribe(res => {
          console.log('response list all by pharmacy: ' + res.msg);
          console.log('response result list all by pharmacy: ' + res.result);
          if (res.msg === 'OK') {
            for (const prod of res.result) {
              this.bucket.listProduct.set(prod.id, prod);
            }

            if (this.bucket.prodMap.get(product) === undefined) {
              this.bucket.prodMap.set(product, this.quantity);
            } else {
              this.bucket.prodMap.set(product, this.bucket.prodMap.get(product) + this.quantity);
            }
            this.bucket.cpt += this.quantity;
            this.bucketService.cryptBucket();

          }
        });

      }

    } else {
      if (this.bucket.prodMap.get(product) === undefined) {
        this.bucket.prodMap.set(product, this.quantity);
      } else {
        this.bucket.prodMap.set(product, this.bucket.prodMap.get(product) + this.quantity);
      }
      this.bucket.cpt += this.quantity;
      this.bucketService.cryptBucket();
    }
  }

  getQuantity() {
    return this.quantity;
  }

  favorite() {
    if (this.isFavorite === true) {
      this.favoriteproductService.addToFavoriteProduct(this.id).subscribe(reslt => {
        console.log('response: ' + reslt.result);
        if (reslt.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'Added to my favorites'});
        } else {
          this.messageService.add({severity: 'info', summary: 'Error', detail: 'Unable to added to my favorites'});
        }
      });
    } else {
      this.favoriteproductService.removeFromFavoriteProduct(this.id).subscribe(res => {
        if (res.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'Remove from my favorites'});
        } else {
          this.messageService.add({severity: 'info', summary: 'Error', detail: 'Unable to remove from my favorites'});
        }
      });
    }
  }
}
