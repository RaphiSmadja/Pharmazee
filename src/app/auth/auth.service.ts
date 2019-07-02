import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, pipe, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../entities/Login';
import {FormGroup} from '@angular/forms';
import {User} from '../entities/User';
import {EncryptDecryptService} from '../services/encrypt-decrypt.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {BucketService} from '../services/bucket.service';
import {Bucket} from '../entities/Bucket';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authSubject = new Subject<any[]>();
  private session: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // tslint:disable-next-line:variable-name
  private _bucket: Bucket;

  private apiURL = environment.baseUrl + 'users/';
  private httpOptions = environment.httpOptions;

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   }),
  //   withCredentials: true
  // };

  constructor(private http: HttpClient, private encryptDecrypt: EncryptDecryptService, private router: Router,
              private bucketService: BucketService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('sess')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(loginForm: FormGroup) {
    return this.http.post<any>(this.apiURL + 'login', loginForm.value, this.httpOptions).pipe(
      map(sess => {
        console.log('sessssssssss'  + sess.msg);
        if (sess && sess.msg === 'OK') {
          const sessObj = {
            expiredAt: Date.now() + sess.result.cookie.originalMaxAge,
            firstname: sess.result.firstname,
            lastname: sess.result.lastname,
            email: sess.result.email,
            status: sess.result.status
          };
          // Encrypt session
          this.encryptDecrypt.encryptAndStor(sessObj, 'Log');

          return sess;
        }
        return sess;
      }));
  }

  logout() {
    localStorage.removeItem('Log');
    localStorage.removeItem('listProduct');
    localStorage.removeItem('prodMap');
    localStorage.removeItem('pharmacy');
    localStorage.removeItem('cpt');
    this.bucketService.bucketObservable.subscribe(
      (x: any) => {
        console.log(x);
        this._bucket = x;
      }
    );
    this.router.navigate(['/']);
    return this.http.get<User>(this.apiURL + 'logout', this.httpOptions).subscribe((value) => {
      console.log(value);
    });
  }

  public isLoggedIn() {
      const decryptData = this.encryptDecrypt.decryptD('Log', 'RyV_SmQ_AL1');
      if (!decryptData) {
        return false;
      } else {
        if (decryptData.expiredAt <= Date.now()) {
          this.logout();
          return false;
        } else {
          return true;
        }
      }
  }

  public aboutMe() {
    return this.http.get(this.apiURL + 'aboutMe', this.httpOptions).pipe(
      map((x: any) => {
        console.log('x::::::::' + x);
        return x;
      })
    );
  }
}
