import { Component, OnInit } from '@angular/core';
import {User} from '../entities/User';
import {UserService} from '../auth/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem, ConfirmationService} from 'primeng/api';
import {first} from 'rxjs/operators';
import {PharmacyService} from '../pharmacy/pharmacy.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [ConfirmationService]
})
export class AdminUsersComponent implements OnInit {

  users: User[] = null;
  private userForm: FormGroup;
  clonedUsers: { [s: string]: User; } = {};
  genders: SelectItem[];
  pharmacies: SelectItem[] = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private pharmacyService: PharmacyService) { }

  ngOnInit() {
    this.userService.listAllUser().subscribe(res => {
      console.log('res: ' + res.msg);
      if (res.msg === 'OK') {
        this.users = res.result;
      }
      console.log('Users : ' + this.users);
    });

    this.pharmacyService.listAllPharmacy().subscribe(res => {
      if (res.msg === 'OK') {
        for (const pharma of res.result) {
          this.pharmacies.push({label: pharma.id.toString(), value: pharma.id});
          console.log('phamacies: ' + pharma);
        }
      }
    });

    this.genders = [
      {label: 'Homme', value: 'm'},
      {label: 'Femme', value: 'f'}
    ];
  }

  onRowEditInit(user: User) {
    this.clonedUsers[user.id] = {...user};
  }

  onRowEditSave(user: User) {
    console.log('email:::', user.email);
    if (user.email.length > 0) {
      delete this.clonedUsers[user.id];
      this.userForm = this.formBuilder.group({
        firstname: [user.firstname, Validators.required],
        lastname: [user.lastname, Validators.required],
        gender: [user.gender, Validators.required],
        email: [user.email, Validators.required],
        pseudo: [user.pseudo, Validators.required],
        phone: [user.phone, Validators.required],
        city: [user.city, Validators.required],
        adresse: [user.adresse, Validators.required],
        postalcode: [user.postalcode, Validators.required],
        status: [user.status, Validators.required],
        nbloyalty: [user.nbloyalty, Validators.required]
      });
      console.log('Id: ' + user.id);
      console.log('Form: firstname: ' + this.userForm.value.firstname);
      console.log('Form: lastname: ' + this.userForm.value.lastname);
      console.log('Form: gender: ' + this.userForm.value.gender);
      console.log('Form: email: ' + this.userForm.value.email);
      console.log('Form: pseudo: ' + this.userForm.value.pseudo);
      console.log('Form: phone: ' + this.userForm.value.phone);
      console.log('Form: city: ' + this.userForm.value.city);
      console.log('Form: adresse: ' + this.userForm.value.adresse);
      console.log('Form: postalcode: ' + this.userForm.value.postalcode);
      console.log('Form: status: ' + this.userForm.value.status);
      console.log('Form: nbloyalty: ' + this.userForm.value.nbloyalty);
      this.userService.updateProfile(this.userForm, user.id).pipe(first()).subscribe(res => {
        console.log('Update response: ' + res.msg);
        if (res.msg === 'OK') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'User is updated'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: res.result});
        }
      },
        error => {
        console.log(error);
        });
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email is required'});
    }
  }

  onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.id];
    delete this.clonedUsers[user.id];
  }

  onRowDeleteUser(user: User, index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(res => {
          console.log('Update response: ' + res.msg);
          if (res.msg === 'OK') {
            delete this.clonedUsers[user.id];
            this.users.splice(index, 1);
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Utilisateur est supprimé'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: res.result});
          }
        },
          error => {
          console.log(error);
          });
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'Vous avez annulé suppression d\'utilisateur!'});
      }
    });
  }

}
