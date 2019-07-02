import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }
  private ciphertext: string;
  private ciboulette: string;

  encryptAndStor(obj: object, key: string) {
    localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(obj), 'RyV_SmQ_AL1'));
  }

  encryptAndStorStr(obj: string, key: string) {
    localStorage.setItem(key, CryptoJS.AES.encrypt(obj, 'RyV_SmQ_AL1'));
  }

  decryptD(keyStorage: string, keyDecrypt: string) {
    if (localStorage.getItem(keyStorage) !== null) {
      let bytes  = CryptoJS.AES.decrypt(localStorage.getItem(keyStorage).toString(), keyDecrypt);
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } else {
      return null;
    }
  }

  decryptDstr(keyStorage: string, keyDecrypt: string) {
    if (localStorage.getItem(keyStorage) !== null) {
      let bytes  = CryptoJS.AES.decrypt(localStorage.getItem(keyStorage).toString(), keyDecrypt);
      let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } else {
      return null;
    }
  }
}
