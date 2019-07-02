import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Orders} from '../entities/Orders';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiURL = environment.baseUrl + 'order';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) {}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  public create(order: Orders): Observable<any> {
    return this.http.post(this.apiURL + '/' + order.id_pharmacy, order, this.httpOptions);
  }


  public listOne(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map((x: any) => {
        console.log('xxxxxxxxx:::::::::' + x.result);
        return x;
      })
    );
  }

  public listAllOfUser(): Observable<any> {
    return this.http.get(this.apiURL + '/mine', this.httpOptions).pipe(
      map((x: any) => {
        return x;
      })
    );
  }
  public updateOrder(id: number, status: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/' + id, {status: status}, this.httpOptions);
  }

  public deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/' + id, this.httpOptions);
  }

  public listAll(): Observable<any> {
    return this.http.get(this.apiURL, this.httpOptions).pipe(
      map((x: any) => {
        return x;
      })
    );
  }

  public listMinePharmacy(): Observable<any> {
    return this.http.get(this.apiURL + '/my_pharmacy', this.httpOptions).pipe(
      map((x: any) => {
        console.log('x:::::::::::' + x);
        return x;
      })
    );
  }

}
