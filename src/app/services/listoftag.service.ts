import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListoftagService {
  private apiURL = environment.baseUrl + 'listoftag';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) { }

  public create(listoftagForm: any) {
    console.log(listoftagForm);
    return this.http.post<any>(this.apiURL + '/', listoftagForm, this.httpOptions);
  }

  public listAll() {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions);
  }
}
