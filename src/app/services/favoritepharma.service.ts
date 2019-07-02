import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritepharmaService {

  private apiURL = environment.baseUrl + 'favoritepharma';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) { }


  public favoritePharmacy(id: string) {
    return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public addToFavoritePharmacy(id: string) {
    return this.http.post<any>(this.apiURL + '/' + id, {}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public removeFromFavoritePharmacy(id: string) {
    return this.http.delete<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

}
