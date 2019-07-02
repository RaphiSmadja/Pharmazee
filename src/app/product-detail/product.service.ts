import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Catalog} from '../entities/Catalog';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Product} from '../entities/Product';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = environment.baseUrl + 'product';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) {
  }

  productArr: Product[];
  public create(productForm: FormGroup) {
    return this.http.post<any>(this.apiURL + '/' + productForm.value, this.httpOptions).pipe(
      map(reg => {
          if (reg) {
            console.log(reg);
          }
          return reg;
        }
      )
    );
  }

  public listAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions).pipe(
      map((x: any) => {
        return x.result;
      })
    );
  }

  public listAllByCatalog(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/list_all_my/' + id, this.httpOptions).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }

  public listOne(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public listAllByPharmacy(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/list_all_my/' + id, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
