import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Pharmacy} from '../entities/Pharmacy';
import {PharmacyService} from '../pharmacy/pharmacy.service';
import {MenuItem, MessageService} from 'primeng/api';
import {Bucket} from '../entities/Bucket';
import {BucketService} from '../services/bucket.service';
import {Observable} from 'rxjs';
import {EncryptDecryptService} from '../services/encrypt-decrypt.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _pharmArray: Pharmacy[];
  // tslint:disable-next-line:variable-name
  private _logged = false;
  status = 1;
  // tslint:disable-next-line:variable-name
  _bucket: any;
  visibleSidebar1: boolean;
  visibleSidebar2: boolean;

  constructor(private messageService: MessageService, private authService: AuthService,
              private pharmacyService: PharmacyService, private bucketService: BucketService,
              private encryptDecrypt: EncryptDecryptService) {
  }

  ngOnInit() {
    this.listNamePharmacy();
    if (!this.bucketService.isEmpty()) {
      this._bucket = this.bucketService.bucket;
    } else {
      this.bucketService.bucketObservable.subscribe(
        (x: any) => {
          console.log(x);
          this._bucket = x;
        }
      );
    }
    // this.bucketService.bucketObservable.subscribe(
    //   (x: any) => {
    //     console.log('x : ' + x);
    //     this._bucket = x;
    //   }
    // );
    // this.isLogin();
  }

  isLogout() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'you are disconnected'});
    this.bucket.cpt = 0;
    return this.authService.logout();
  }

  isLogin() {
    return this.authService.isLoggedIn();
  }

  isStatus() {
    if (this.authService.isLoggedIn() === true) {
      this.status = this.encryptDecrypt.decryptD('Log', 'RyV_SmQ_AL1').status;
      return this.status;
    } else {
      this.status = 0 ;
      return this.status;
    }
  }

  listNamePharmacy() {
    this.pharmacyService.listAllPharmacy().subscribe(
      pharma => {
        this._pharmArray = pharma.result;
        console.log(pharma.result);
      }, error => console.error(error),
      () => console.log('onComplet')
    );
  }


  get pharmArray(): Pharmacy[] {
    return this._pharmArray;
  }

  get logged(): boolean {
    return this._logged;
  }

  get bucket(): Bucket {
    return this._bucket;
  }
}
