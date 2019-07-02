import {Product} from './Product';
import {Pharmacy} from './Pharmacy';

export class Bucket {
  // tslint:disable-next-line:variable-name
  private _cpt = 0;
  // tslint:disable-next-line:variable-name
  private _prodMap = new Map();
  // tslint:disable-next-line:variable-name
  private _listProduct = new Map();
  // tslint:disable-next-line:variable-name
  private _pharmacy: Pharmacy = null;
  // tslint:disable-next-line:variable-name
  private _id: string;


  get cpt(): number {
    return this._cpt;
  }

  set cpt(value: number) {
    this._cpt = value;
  }

  get listProduct(): Map<number, Product> {
    return this._listProduct;
  }

  set listProduct(listProd: Map<number, Product>) {
    this._listProduct = listProd;
  }

  get prodMap(): Map<number, number> {
    return this._prodMap;
  }

  set prodMap(productMap: Map<number, number>) {
    this._prodMap = productMap;
  }

  get pharmacy(): Pharmacy {
    return this._pharmacy;
  }

  set pharmacy(pharma: Pharmacy) {
    this._pharmacy = pharma;
  }

  set id(val: string) {
    this._id = val;
  }

  get id(): string {
    return this._id;
  }
}
