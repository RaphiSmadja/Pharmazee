import { Injectable } from '@angular/core';
import * as Stripe from 'stripe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiURL = environment.baseUrl + 'payer';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) { }

  createSession(line_items: any[]) {
    return this.http.post(this.apiURL + '/create_session', {line_items}, this.httpOptions).pipe(
      map( (x: any) => {
        console.log('x -- ' + x);
        return x;
      })
    );
  }

  createIntent(amount) {
    return this.http.post(this.apiURL + '/createIntent', amount, this.httpOptions).pipe(
      map( (x: any) => {
        console.log('x -- ' + x);
        return x;
      })
    );
  }
}
