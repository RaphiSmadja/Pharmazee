import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PharmacyService} from '../pharmacy/pharmacy.service';
import {Pharmacy} from '../entities/Pharmacy';
import {Subscription} from 'rxjs';
import {google} from '@agm/core/services/google-maps-types';
import {CatalogService} from '../catalog/catalog.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../auth/auth.service';
import {Bucket} from '../entities/Bucket';
import {BucketService} from '../services/bucket.service';
import {UserService} from '../auth/user.service';
import {ProductService} from '../product-detail/product.service';
import {FavoritepharmaService} from '../services/favoritepharma.service';
import {Rate} from '../entities/Rate';
import {RateService} from '../services/rate.service';

@Component({
  selector: 'app-pharmacy-detail',
  templateUrl: './pharmacy-detail.component.html',
  styleUrls: ['./pharmacy-detail.component.css']
})
export class PharmacyDetailComponent implements OnInit, OnDestroy {

  catalogsid: number;
  val = 0;
  name: string;
  options: any;
  sess: any;
  // lat = 51.673858;
  // lng = 7.815982;

  private subscriber: Subscription;

  pharmacy: Pharmacy;
  private id: string;
  private bucket: any;
  private authInfo: any;
  isFavorite = false;
  private rates: Rate[];
  private rateId: number;
  private nbRates = 0;
  private isRated = false;

  // tslint:disable-next-line:max-line-length
  constructor(private messageService: MessageService,
              private pharmacyService: PharmacyService,
              private catalogService: CatalogService,
              private route: ActivatedRoute,
              private router: Router,
              private bucketService: BucketService,
              private favoritePharmaService: FavoritepharmaService,
              private authService: AuthService,
              private userService: UserService,
              private productService: ProductService,
              private rateService: RateService) {
  }

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

    // this.options = {
    //   center: {lat: 36.890257, lng: 30.707417},
    //   zoom: 12
    // };
    this.route.params
      .subscribe((params: Params): void => {
        this.id = params.id;
        console.log('--- ' + this.id);

        this.pharmacyService.listPharmacyById(+this.id).subscribe(test => {
            if (test.msg === 'NOK') {
              this.router.navigate(['/not-found']);
            } else {
              this.pharmacy = test.result;
              if (this.bucket.cpt < 1) {
                this.bucket.pharmacy = test.result;

                console.log('blablablablablablabla : ' +  this.pharmacy.catalogs.id.toString());
                this.productService.listAllByPharmacy(this.pharmacy.catalogs.id.toString()).subscribe(res => {
                  console.log('response list all by pharmacy: ' + res.msg);
                  console.log('response result list all by pharmacy: ' + res.result);
                  if (res.msg === 'OK') {
                    for (const prod of res.result) {
                      this.bucket.listProduct.set(prod.id, prod);
                    }
                  }

                  console.log('Array.from(this.bucket.listProduct) : ');
                  console.log(Array.from(this.bucket.listProduct.entries()));
                  this.bucketService.cryptBucket();
                });

              }
              console.log(test.result);
            }
            console.log('----' +  this.pharmacy);
            console.log('this.pharmacy.id --------- ' + this.pharmacy.id);
          }, error => console.error(error),
          () => console.log('onComplet'));
      });

    this.authService.aboutMe().subscribe(res => {
      if (res.msg === 'OK') {
        this.authInfo = res.result;
      }
    });

    this.favoritePharmaService.favoritePharmacy(this.id).subscribe(res => {
        console.log('response: ' + res.msg);
        console.log('response result: ' + res.result);
        if (res.msg === 'OK') {
          if (res.result.count > 0) {
            this.isFavorite = true;
            console.log('stats: ' + this.isFavorite);
          }
        }
      }, error => console.error(error),
      () => console.log('onComplet'));


    this.rateService.listByPharmacy(this.id).subscribe(res => {
      if (res.msg === 'OK') {
        this.rates = res.result.rows;
        this.nbRates = res.result.count;
        for (const rate of this.rates) {
          if (rate.id_user === this.authInfo.id) {
            this.val = rate.ratevalue;
            this.isRated = true;
            this.rateId = rate.id;
            console.log('rate.id_user: ' + this.val);
          }
        }
      }
    });

    console.log('pharmacy ----- ' + this.bucket.pharmacy);
  }

  ngOnDestroy() {
    console.log('deded');
  }

  catalogClick() {
    this.catalogService.listOne(+this.id).subscribe(test => {
        console.log('---- test ---- ' + test);
        if (test.result === null) {
          this.messageService.add({severity: 'info', summary: 'Message', detail: 'Impossible pharmacy doesn\'t have a catalog'});
        } else {
          this.router.navigate(['catalog/' + this.pharmacy.id_catalog]);
        }
      }, error => console.error(error),
      () => console.log('onComplet'));
  }

  favorite() {
    if (this.isFavorite === true) {
      this.favoritePharmaService.addToFavoritePharmacy(this.id).subscribe(reslt => {
        console.log('response: ' + reslt.result);
        if (reslt.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'Added to my favorites'});
        } else {
          this.messageService.add({severity: 'info', summary: 'Error', detail: 'Unable to added to my favorites'});
        }
      });
    } else {
      this.favoritePharmaService.removeFromFavoritePharmacy(this.id).subscribe(res => {
        if (res.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Success', detail: 'Remove from my favorites'});
        } else {
          this.messageService.add({severity: 'info', summary: 'Error', detail: 'Unable to remove from my favorites'});
        }
      });
    }
  }

  averageRate() {
    let total = 0;
    if (this.nbRates > 0) {
      for (const rate of this.rates) {
        total += rate.ratevalue;
      }
      return Math.round(total / this.nbRates);
    } else {
      return 0;
    }
  }

  rating() {
    if (this.isRated) {
      this.rateService.update(this.rateId, this.val).subscribe(res => {
        if (res.msg === 'OK') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Rating changed'});

          this.rateService.listByPharmacy(this.id).subscribe(result => {
            if (result.msg === 'OK') {
              this.rates = result.result.rows;
              this.nbRates = result.result.count;
              for (const rate of this.rates) {
                if (rate.id_user === this.authInfo.id) {
                  console.log('rate.id_user' + rate.id_user);
                  this.val = rate.ratevalue;
                  this.isRated = true;
                  this.rateId = rate.id;
                }
              }
            }
          });

        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Fail to change rate'});
        }
      });
    } else {
      this.rateService.create(this.id, this.val).subscribe(res => {
        if (res.msg === 'OK') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Rating success'});

          this.rateService.listByPharmacy(this.id).subscribe(result => {
            if (result.msg === 'OK') {
              this.rates = result.result.rows;
              this.nbRates = result.result.count;
              for (const rate of this.rates) {
                if (rate.id_user === this.authInfo.id) {
                  console.log('rate.id_user' + rate.id_user);
                  this.val = rate.ratevalue;
                  this.isRated = true;
                  this.rateId = rate.id;
                }
              }
            }
          });

        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Fail to rate'});
        }
      });
    }
  }

}
