import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pharmacy} from '../entities/Pharmacy';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CatalogService} from '../catalog/catalog.service';
import {FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {


  private pharmArray: Pharmacy[] = [];

  private apiURL = environment.baseUrl + 'pharmacy';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  public listAllPharmacy(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions).pipe(
      map( (x: any) => {
        console.log(x);
        return x;
      })
    );
  }

  public listPharmacyById(id: number): Observable<any>  {
    return this.http.get(this.apiURL + '/' + id, this.httpOptions);
  }

  public createPharmacy(fd: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/', fd, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public modifyPharmacy(form: FormGroup, id: number) {
    return this.http.put<any>(this.apiURL + '/' + id, form.value, this.httpOptions).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public deletePharmacy(idPharma: number) {
    return this.http.delete<any>(this.apiURL + '/' + idPharma, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public deleteMyPharmacy() {
    return this.http.delete(this.apiURL + '/delete_my', this.httpOptions);
  }


}
