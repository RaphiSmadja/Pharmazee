import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private apiURL = environment.baseUrl + 'rate';
  private httpOptions = environment.httpOptions;

    constructor(private http: HttpClient) { }

    public listByPharmacy(id: string): Observable<any> {
      return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    public create(id: string, value: number): Observable<any> {
      return this.http.post<any>(this.apiURL + '/' + id, {ratevalue: value}, this.httpOptions).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    public update(id: number, value: number): Observable<any> {
      return this.http.put<any>(this.apiURL + '/' + id, {ratevalue: value}, this.httpOptions).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
}
