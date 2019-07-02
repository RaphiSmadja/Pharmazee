import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {PharmacyService} from '../pharmacy/pharmacy.service';

@Component({
  selector: 'app-create-pharmacy',
  templateUrl: './create-pharmacy.component.html',
  styleUrls: ['./create-pharmacy.component.css']
})
export class CreatePharmacyComponent implements OnInit {

  pharmacyForm: FormGroup;
  submitted: boolean;
  selectedFiles: File[] = [];
  fd = new FormData();

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private httpClient: HttpClient,
              private pharmacyService: PharmacyService) { }

  ngOnInit() {

    this.pharmacyForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      adresse: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      postalcode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])),
      longitude: new FormControl('', Validators.compose([Validators.required])),
      latitude: new FormControl('', Validators.compose([Validators.required])),
      file: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      user: new FormControl('', Validators.required)
    });
  }


  onSubmit(value: any) {
    console.log(value.file);
    const files = this.selectedFiles;

    this.submitted = true;

    this.fd.append('name', this.pharmacyForm.get('name').value);
    this.fd.append('email', this.pharmacyForm.get('email').value);
    this.fd.append('description', this.pharmacyForm.get('description').value);
    this.fd.append('phone', this.pharmacyForm.get('phone').value);
    this.fd.append('city', this.pharmacyForm.get('city').value);
    this.fd.append('adresse', this.pharmacyForm.get('adresse').value);
    this.fd.append('postalcode', this.pharmacyForm.get('postalcode').value);
    this.fd.append('longitude', this.pharmacyForm.get('longitude').value);
    this.fd.append('latitude', this.pharmacyForm.get('latitude').value);
    this.fd.append('id_user', this.pharmacyForm.get('user').value);
    this.fd.append('filePharmacy', files[0], files[0].name);
    this.fd.append('filePharmacy', files[1], files[1].name);
    this.fd.append('filePharmacy', files[2], files[2].name);

    console.log('formData1: ' + files[0].name);
    console.log('formData2: ' + files[1].name);
    console.log('formData3: ' + files[2].name);

    this.pharmacyService.createPharmacy(this.fd).subscribe(
      (val: any) => {
        console.log(val);
        if (val.msg === 'OK') {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pharmacy created'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create pharmacy'});
        }
      }
    );
  }


  get diagnostic() {
    return JSON.stringify(this.pharmacyForm.value);
  }

  onFileSelected(event: any) {
    console.log('FormGroup: ' + this.pharmacyForm);
    console.log(event);
    this.selectedFiles = event.target.files;
    console.log('event: ' + this.selectedFiles);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log('file: ' + this.selectedFiles[i].name);
    }
    this.pharmacyForm.get('file').setValue(this.selectedFiles);
    this.fd.append('filePharmacy', this.pharmacyForm.get('file').value);
    console.log('file form: ' + this.diagnostic);
  }

}
