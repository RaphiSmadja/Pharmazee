import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FavoriteproductService {
  private apiURL = environment.baseUrl + 'favoriteproduct';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) {}

  public favoriteProduct(id: number) {
    return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public addToFavoriteProduct(id: number) {
    return this.http.post<any>(this.apiURL + '/' + id, {}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public removeFromFavoriteProduct(id: number) {
    return this.http.delete<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }
}
