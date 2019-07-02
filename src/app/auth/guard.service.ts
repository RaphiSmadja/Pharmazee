import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {EncryptDecryptService} from '../services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private messageService: MessageService, public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['auth/signin']);
      return false;
    }
    return true;
  }
}
