import { Injectable } from '@angular/core';
import {Bucket} from '../entities/Bucket';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {EncryptDecryptService} from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  // tslint:disable-next-line:variable-name
  private _bucket = new Bucket();

  constructor(private encryptDecrypt: EncryptDecryptService) {
    this._bucket.listProduct = new Map(this.encryptDecrypt.decryptD('listProduct', 'RyV_SmQ_AL1'));
    this._bucket.prodMap = new Map(this.encryptDecrypt.decryptD('prodMap', 'RyV_SmQ_AL1'));
    this._bucket.cpt = +this.encryptDecrypt.decryptD('cpt', 'RyV_SmQ_AL1');
    this._bucket.pharmacy = this.encryptDecrypt.decryptD('pharmacy', 'RyV_SmQ_AL1');

    // if (this._bucket.pharmacy !== null) {
    //
    // } else {
    // this.cryptBucket();
    // }
    console.log('listProduct: ');
    console.log(this._bucket.listProduct);
    console.log('prodMap: ');
    console.log(this._bucket.prodMap);
    console.log(this._bucket.pharmacy);
    console.log(this._bucket.cpt);

    console.log('buckeeeeeeeeeeeet : ');
    console.log(this._bucket);
  }

  bucketObservable = new Observable(subscriber => {
    subscriber.next(this._bucket);
  });

  get bucket(): Bucket {
    this._bucket.listProduct = new Map(this.encryptDecrypt.decryptD('listProduct', 'RyV_SmQ_AL1'));
    this._bucket.prodMap = new Map(this.encryptDecrypt.decryptD('prodMap', 'RyV_SmQ_AL1'));
    this._bucket.cpt = +this.encryptDecrypt.decryptD('cpt', 'RyV_SmQ_AL1');
    this._bucket.pharmacy = this.encryptDecrypt.decryptD('pharmacy', 'RyV_SmQ_AL1');
    console.log('listProduct 2: ');
    console.log(this._bucket.listProduct);
    console.log('prodMap 2: ');
    console.log(this._bucket.prodMap);
    console.log(this._bucket.pharmacy);
    console.log(this._bucket.cpt);

    return this._bucket;
  }

  isEmpty(): boolean {
    this._bucket.listProduct = new Map(this.encryptDecrypt.decryptD('listProduct', 'RyV_SmQ_AL1'));
    this._bucket.prodMap = new Map(this.encryptDecrypt.decryptD('prodMap', 'RyV_SmQ_AL1'));
    this._bucket.cpt = +this.encryptDecrypt.decryptD('cpt', 'RyV_SmQ_AL1');
    this._bucket.pharmacy = this.encryptDecrypt.decryptD('pharmacy', 'RyV_SmQ_AL1');
    if (this._bucket.pharmacy !== null) {
      console.log('not empty');
      return false;
    } else {
      console.log('is empty');
      return true;
    }
  }

  cryptBucket() {
    this.encryptDecrypt.encryptAndStor(Array.from(this._bucket.listProduct.entries()), 'listProduct');
    console.log('encrypting 1: ');
    console.log(Array.from(this._bucket.listProduct.keys()));
    this.encryptDecrypt.encryptAndStor(Array.from(this._bucket.prodMap.entries()), 'prodMap');
    console.log('encrypting 2: ');
    console.log(Array.from(this._bucket.prodMap.entries()));
    // console.log(this._bucket.pharmacy);
    this.encryptDecrypt.encryptAndStor(this._bucket.pharmacy, 'pharmacy');
    console.log('encrypting 3: ');
    console.log(this._bucket.pharmacy);
    this.encryptDecrypt.encryptAndStorStr(this._bucket.cpt.toString(), 'cpt');
    console.log('encrypting 4: ');
  }

}
