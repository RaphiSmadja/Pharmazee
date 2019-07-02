import { Component, OnInit } from '@angular/core';
import {PharmacyService} from '../pharmacy/pharmacy.service';
import {Pharmacy} from '../entities/Pharmacy';
import {User} from '../entities/User';
import {MessageService, ConfirmationService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-pharmacies',
  templateUrl: './admin-pharmacies.component.html',
  styleUrls: ['./admin-pharmacies.component.css'],
  providers: [ConfirmationService]
})
export class AdminPharmaciesComponent implements OnInit {

  pharmacies: Pharmacy[] = null;
  private pharmacyForm: FormGroup;
  clonedPharmacies: { [s: string]: Pharmacy; } = {};

  constructor(private pharmacyService: PharmacyService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {
    this.pharmacyService.listAllPharmacy().subscribe(res => {
      console.log('res: ' + res.msg);
      if (res.msg === 'OK') {
        this.pharmacies = res.result;
      }
      console.log('Pharmacies: ' + this.pharmacies);
    });
  }

  onRowEditInit(pharmacy: Pharmacy) {
    this.clonedPharmacies[pharmacy.id] = {...pharmacy};
  }

  onRowEditSave(pharmacy: Pharmacy) {
    console.log('email:::', pharmacy.email);
    if (pharmacy.email.length > 0) {
      delete this.clonedPharmacies[pharmacy.id];
      this.pharmacyForm = this.formBuilder.group({
        name: [pharmacy.name, Validators.required],
        email: [pharmacy.email, Validators.required],
        description: [pharmacy.description, Validators.required],
        phone: [pharmacy.phone, Validators.required],
        city: [pharmacy.city, Validators.required],
        adresse: [pharmacy.adresse, Validators.required],
        postalcode: [pharmacy.postalcode, Validators.required],
        picture1: [pharmacy.picture1, Validators.required],
        picture2: [pharmacy.picture2, Validators.required],
        picture3: [pharmacy.picture3, Validators.required],
        nbclickcall: [pharmacy.nbclickcall, Validators.required],
        longitude: [pharmacy.longitude, Validators.required],
        latitude: [pharmacy.latitude, Validators.required],
      });
      console.log('Id: ' + pharmacy.id);
      console.log('Form: name: ' + this.pharmacyForm.value.name);
      console.log('Form: email: ' + this.pharmacyForm.value.email);
      console.log('Form: description: ' + this.pharmacyForm.value.description);
      console.log('Form: phone: ' + this.pharmacyForm.value.phone);
      console.log('Form: city: ' + this.pharmacyForm.value.city);
      console.log('Form: adresse: ' + this.pharmacyForm.value.adresse);
      console.log('Form: postalcode: ' + this.pharmacyForm.value.postalcode);
      console.log('Form: picture1: ' + this.pharmacyForm.value.picture1);
      console.log('Form: picture2: ' + this.pharmacyForm.value.picture2);
      console.log('Form: picture3: ' + this.pharmacyForm.value.picture3);
      console.log('Form: nbclickcall: ' + this.pharmacyForm.value.nbclickcall);
      console.log('Form: longitude: ' + this.pharmacyForm.value.longitude);
      console.log('Form: latitude: ' + this.pharmacyForm.value.latitude);
      this.pharmacyService.modifyPharmacy(this.pharmacyForm, pharmacy.id).pipe(first()).subscribe(res => {
          console.log('Update response: ' + res.msg);
          if (res.msg === 'OK') {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pharmacy is updated'});
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

  onRowEditCancel(pharmacy: Pharmacy, index: number) {
    this.pharmacies[index] = this.clonedPharmacies[pharmacy.id];
    delete this.clonedPharmacies[pharmacy.id];
  }

  onRowDeletePharmacy(pharmacy: Pharmacy, index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this pharmacy?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pharmacyService.deletePharmacy(pharmacy.id).subscribe(res => {
            console.log('Delete response: ' + res.msg);
            if (res.msg === 'OK') {
              delete this.clonedPharmacies[pharmacy.id];
              this.pharmacies.splice(index, 1);
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pharmacy est supprimé'});
            } else {
              this.messageService.add({severity: 'error', summary: 'Error', detail: res.result});
            }
          },
          error => {
            console.log(error);
          });
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'Vous avez annulé suppression de pharmacy!'});
      }
    });
  }

  create() {
    this.router.navigate(['create-pharmacy/']);
  }

}
