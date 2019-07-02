import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Catalog} from '../entities/Catalog';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControlName, FormGroup} from '@angular/forms';
import {Product} from '../entities/Product';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  private apiURL = environment.baseUrl + 'product';
  private crawlerURL = environment.baseUrl + 'crawler';

  private httpOptions = environment.httpOptions;

  public create(productForm: FormGroup) {
    console.log(productForm.value);
    return this.http.post<any>(this.apiURL + '/', productForm.value, this.httpOptions);
  }

  public crawl(crawler: any) {
    console.log(crawler);
    return this.http.post<any>(this.crawlerURL, crawler, this.httpOptions).pipe(
      map((x: any) => {
        console.log('---- ' + x);
        return x;
      })
    );
  }
  public listAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions).pipe(
      map((x: any) => {
        return x.result;
      })
    );
  }

  public listAllByCatalog(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions).pipe(
      map((data: any) => {
        console.log(data.result);
        return data.result;
      })
    );
  }
}
