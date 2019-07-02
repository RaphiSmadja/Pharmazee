import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {EmailValidator, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {User} from '../../entities/User';
import {MessageService} from 'primeng/api';
import {MenuComponent} from '../../menu/menu.component';
import {Observable} from 'rxjs';

@Component({
  providers: [MenuComponent],
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private sign: any[];
  private submitted = false;
  private logTest: User;
  private userCurrent: User;
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private menuComponent: MenuComponent) {
  }

  addSingle() {
    this.messageService.add({severity: 'info', summary: 'Service Message', detail: 'Successful connection'});
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm).pipe(first())
      .subscribe(
        sess => {
          if (sess.msg === 'OK') {
            console.log('youhouohououo');
            this.router.navigateByUrl('/');
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Welcome ' + sess.result.firstname});
            console.log('youhouohououo');
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: sess.result});
            return;
          }
        },
        error => {
          console.log(error);
        });
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
