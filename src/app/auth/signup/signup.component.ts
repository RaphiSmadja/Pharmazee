import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../entities/User';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {UserService} from '../user.service';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private sign: any[];
  private userSubscription: Subscription;
  genders: SelectItem[];
  registerForm: FormGroup;
  isSubmitted  =  false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pseudo: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      passwordconfirmation: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      avatar: [''],
      city: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      adresse: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      postalcode: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])]
    });

    this.genders = [];
    this.genders.push({label: 'Select Gender', value: ''});
    this.genders.push({label: 'Male', value: 'm'});
    this.genders.push({label: 'Female', value: 'f'});
  }
  register() {
    console.log(this.registerForm.value);
    this.isSubmitted = true;
    // if (this.registerForm.invalid) {
    //   return;
    // }
    this.userService.register(this.registerForm).subscribe(
        reg => {
          console.log('reg.msg' + reg.msg);
          if (reg.msg === 'OK') {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Vous êtes inscrit'});
          }
        },
        error => {
          console.log(error);
        });
  }
}
