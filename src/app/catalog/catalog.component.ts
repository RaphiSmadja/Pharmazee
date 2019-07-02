import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CatalogService} from './catalog.service';
import {Section} from '../entities/Section';
import {ProductService} from '../product-detail/product.service';
import {Product} from '../entities/Product';
import {Bucket} from '../entities/Bucket';
import {BucketService} from '../services/bucket.service';
import {Pharmacy} from '../entities/Pharmacy';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [ConfirmationService]
})
export class CatalogComponent implements OnInit {
  productList: Product[] = [];
  private bucket: any;
  private id: string;
  pharmacy: Pharmacy;
  sortField: string;
  sortOrder: number;
  private sortOptions: SelectItem[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bucketService: BucketService,
              private catalogService: CatalogService,
              private productService: ProductService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }
  ngOnInit() {
    if (!this.bucketService.isEmpty()) {
      this.bucket = this.bucketService.bucket;
    } else {
      this.bucketService.bucketObservable.subscribe(
        (x: any) => {
          console.log(x);
          this.bucket = x;
        }
      );
    }

    this.route.params
      .subscribe((params: Params): void => {
        this.id = params.id;
        console.log(' ++++++++++++++++++++ ' + this.id);
        this.productService.listAllByCatalog(this.id).subscribe(
          value => {
            if (value.msg === 'NOK') {
              console.log('pas de produits');
            } else {
              console.log('--------------' + value.result[0].catalog.pharmacy);
              this.productList = value.result;
            }
          });

        this.catalogService.listOne(+this.id).subscribe(res => {
          if (res.msg === 'OK') {
            this.pharmacy = res.result.pharmacy;
          }
        });

      });

    this.sortOptions = [
      {label: 'Newest First', value: '!updatedAt'},
      {label: 'Oldest First', value: 'updatedAt'},
      {label: 'Status', value: 'status'}
    ];
  }

  addbucket(index, idProduct) {
    if (this.bucket.pharmacy.id !== this.pharmacy.id) {
      console.log('this.pharmacy.id :' + this.pharmacy.id);

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

                console.log(index + ' - ' + idProduct);
                this.productList[index].stock = this.productList[index].stock - 1;
                this.bucket.cpt = this.bucket.cpt + 1;
                // this.bucket.listProduct.push(this.productList[index]);

                if (this.bucket.prodMap.get(this.productList[index].id) > 0) {
                  this.bucket.prodMap.set(this.productList[index].id, this.bucket.prodMap.get(this.productList[index].id) + 1);
                } else {
                  this.bucket.prodMap.set(this.productList[index].id, 1);
                }
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

            console.log(index + ' - ' + idProduct);
            this.productList[index].stock = this.productList[index].stock - 1;
            this.bucket.cpt = this.bucket.cpt + 1;
            // this.bucket.listProduct.push(this.productList[index]);

            if (this.bucket.prodMap.get(this.productList[index].id) > 0) {
              this.bucket.prodMap.set(this.productList[index].id, this.bucket.prodMap.get(this.productList[index].id) + 1);
            } else {
              this.bucket.prodMap.set(this.productList[index].id, 1);
            }
            this.bucketService.cryptBucket();
          }
        });

      }

    } else {

      console.log(index + ' - ' + idProduct);
      this.productList[index].stock = this.productList[index].stock - 1;
      this.bucket.cpt = this.bucket.cpt + 1;
      // this.bucket.listProduct.push(this.productList[index]);

      if (this.bucket.prodMap.get(this.productList[index].id) > 0) {
        this.bucket.prodMap.set(this.productList[index].id, this.bucket.prodMap.get(this.productList[index].id) + 1);
      } else {
        this.bucket.prodMap.set(this.productList[index].id, 1);
      }

      this.bucketService.cryptBucket();

    }

  }

  details(id: string) {
    this.router.navigate(['product/' + id]);
  }
}
