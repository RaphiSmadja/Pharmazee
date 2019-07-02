import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Section} from '../entities/Section';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiURL = environment.baseUrl + 'sections';
  private likeURL = environment.baseUrl + 'likes';
  private httpOptions = environment.httpOptions;
  private commentURL = environment.baseUrl + 'comment';
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'content-type': 'multipart/form-data',
  //     // 'Access-Control-Allow-Origin': '*'
  //     // 'Accept': 'application/json',
  //     // 'Access-Control-Allow-Origin': '*'
  //   }),
  //   withCredentials: true
  // };
  constructor(private http: HttpClient) {}

  public listAllSections(): Observable<any> {
    return this.http.get(this.apiURL + '/', this.httpOptions);
  }

  public listAllSectionsByIdPharmacy(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/pharmacy/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public createSectionAdvertisement(fd: any): Observable<any> {
    console.log('----- ' + fd);
    return this.http.post<any>(this.apiURL + '/advertisement', fd, {headers: new HttpHeaders({}), withCredentials: true}).pipe(
      map(res => {
        return res;
      })
    );
  }

  public createSectionStory(fd: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/story', fd, {headers: new HttpHeaders({}), withCredentials: true}).pipe(
      map(res => {
        return res;
      })
    );
  }

  public updateSection(id: number) {
    return this.http.put<Section>(this.apiURL + '/' + id, this.httpOptions);
  }

  public deleteSection(id: number) {
    return this.http.delete<Section>(this.apiURL + '/' + id, this.httpOptions);
  }

  public updateLikes(id: number, likeOrDislike: boolean): Observable<any> {
    return this.http.put<any>(this.likeURL + '/' + id, {likeordislike: likeOrDislike}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public createLikes(id: number, likeOrDislike: boolean): Observable<any> {
    return this.http.post<any>(this.likeURL + '/' + id, {likeordislike: likeOrDislike}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public createComment(id: number, content: string): Observable<any> {
    return this.http.post<any>(this.commentURL + '/' + id, {content}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public updateComment(id: number, content: string): Observable<any> {
    return this.http.put<any>(this.commentURL + '/' + id, {content}, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  public deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(this.commentURL + '/' + id, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

}
