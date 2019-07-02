import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiURL = environment.baseUrl + 'tag';
  private httpOptions = environment.httpOptions;

  constructor(private http: HttpClient) { }

  public create(tagForm: any) {
    console.log(tagForm);
    return this.http.post<any>(this.apiURL + '/', tagForm, this.httpOptions);
  }

  public listAll() {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions);
  }

}
