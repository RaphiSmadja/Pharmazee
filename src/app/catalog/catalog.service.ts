import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Catalog} from '../entities/Catalog';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiURL = environment.baseUrl + 'catalogs';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) {
  }

  public create(catalogForm: FormGroup) {
    return this.http.post<any>(this.apiURL + '/' + catalogForm.value, this.httpOptions).pipe(
      map(reg => {
          if (reg) {
            console.log(reg);
          }
          return reg;
        }
      )
    );
  }

  public listAll(): Observable<Catalog[]> {
    return this.http.get<Catalog>(this.apiURL + '/', this.httpOptions).pipe(
      map((x: any) => {
        return x.result;
      })
    );
  }

  public listOne(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/' + id, this.httpOptions);
  }

  public update(id: number): Observable<any> {
    return this.http.get<Catalog>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map((x: any) => {
        return x.result;
      })
    );
  }

  public delete(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(this.apiURL + '/', this.httpOptions).pipe(
      map((x: any) => {
        return x.result;
      })
    );
  }
}
