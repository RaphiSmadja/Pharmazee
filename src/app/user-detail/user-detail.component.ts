import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../entities/User';
import {UserService} from '../auth/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  genders: SelectItem[];

  firstname = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  lastname = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  gender = new FormControl('', Validators.required);
  pseudo = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  phone = new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)]));
  city = new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]));
  adresse = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  postalcode = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)]));

  private user: User;
  profileForm: FormGroup;
  constructor(private userService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      this.authService.aboutMe().subscribe(reslt => {
        console.log('response: ' + reslt.msg);
        if (reslt.msg === 'OK') {
            this.profileForm.patchValue({
              firstname: reslt.result.firstname,
              lastname: reslt.result.lastname,
              gender: reslt.result.gender,
              pseudo: reslt.result.pseudo,
              phone: reslt.result.phone,
              city: reslt.result.city,
              adresse: reslt.result.adresse,
              postalcode: reslt.result.postalcode
            });
            this.user = reslt.result;
        } else {
          console.log('Error: ' + reslt.result);
        }
      });
    });

    this.profileForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      gender: new FormControl('', Validators.required),
      pseudo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      adresse: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      postalcode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)]))
    });

    this.genders = [];
    this.genders.push({label: 'Select Gender', value: ''});
    this.genders.push({label: 'Male', value: 'm'});
    this.genders.push({label: 'Female', value: 'f'});
  }

  modifyProfile() {
    if (this.profileForm.invalid) {
      console.log('formulaire NOK');
      return;
    }
    console.log('Form::::::::::' + this.profileForm);
    this.userService.updateProfile(this.profileForm, this.user.id).pipe(first()).subscribe(res => {
      if (res.msg === 'OK') {
        console.log('formulaire OK');
        this.messageService.add({severity: 'success', summary: 'Success', detail: res.result});
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res.result});
      }
    },
      error => {
        console.log(error);
      });
  }

}
