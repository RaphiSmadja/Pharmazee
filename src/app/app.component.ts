import {Component, Input, OnInit} from '@angular/core';
import * as AOS from 'aos';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Subscription} from 'rxjs';
import {Bucket} from './entities/Bucket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pharmazee';

  constructor() {
  }
  ngOnInit() {
    AOS.init({
    });
  }
}
