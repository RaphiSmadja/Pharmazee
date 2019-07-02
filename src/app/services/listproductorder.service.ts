import { Injectable } from '@angular/core';
import {ListProductOrder} from '../entities/ListProductOrder';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListproductorderService {

  private apiURL = environment.baseUrl + 'listproductorder';
  private httpOptions = environment.httpOptions;
  constructor(private http: HttpClient) { }

  public createListProductOrder( idProduct: string, idOrder: string, listProdOrder: ListProductOrder): Observable<any> {
    return this.http.post(this.apiURL + '/' + idProduct + '/' + idOrder, listProdOrder, this.httpOptions);
  }
}
