import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiURL = environment.baseUrl + 'prescription';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) { }

  public create(productForm: FormGroup) {
    return this.http.post<any>(this.apiURL + '/', productForm.value, this.httpOptions);
  }

  public listAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions);
  }

  public list(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/' + id, this.httpOptions);
  }

  public listMine(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/list/mine', this.httpOptions);
  }

  public listByPharmacy(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/list/pharmacy', this.httpOptions);
  }

  public modifyPrescription(form: any, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + '/' + id, form, this.httpOptions);
  }

  public deletePrescription(idPrescription: number) {
    return this.http.delete<any>(this.apiURL + '/' + idPrescription, this.httpOptions);
  }
}
