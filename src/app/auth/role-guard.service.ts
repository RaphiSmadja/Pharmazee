import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {MessageService} from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import {EncryptDecryptService} from '../services/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private messageService: MessageService, public auth: AuthService, public router: Router, private encryptDecrypt: EncryptDecryptService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (!this.auth.isLoggedIn()) {
      return false;
      this.router.navigate(['auth/signin']);
    }
    console.log(this.auth.isLoggedIn());
    if (this.encryptDecrypt.decryptD('Log', 'RyV_SmQ_AL1').status !== expectedRole) {
      this.router.navigate(['/']);
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Permission Denied'});
      return false;
    }
    return true;
  }
}
