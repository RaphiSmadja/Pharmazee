import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../entities/User';
import {catchError, map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.baseUrl + 'users';
  private httpOptions = environment.httpOptions;

  user: User;

  constructor(private http: HttpClient) {
  }

  public register(registerForm: FormGroup): Observable<any> {
    return this.http.post<any>(this.apiURL + '/', registerForm.value, this.httpOptions).pipe(
      map((reg: any) => {
          console.log('res create user: ' + reg);
          return reg;
        }
      )
    );
  }

  public listAllUser(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/', this.httpOptions).pipe(
      map( (x: any) => {
        return x;
      })
    );
  }

  public listUserById(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/' + id, this.httpOptions).pipe(
      map((x: any) => {
        return x;
      })
    );
  }

  public updateProfile(profileForm: FormGroup, id: number) {
    console.log('Form passed: ', profileForm.value);
    return this.http.put<any>(this.apiURL + '/' + id, profileForm.value, this.httpOptions).pipe(
      map(res => {
          return res;
      })
    );
  }

  public deleteUser(id: number) {
    return this.http.delete<any>(this.apiURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

}
