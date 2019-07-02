import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {SectionService} from '../../section-detail/section.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-creation-section',
  templateUrl: './creation-section.component.html',
  styleUrls: ['./creation-section.component.css']
})
export class CreationSectionComponent implements OnInit {

  sectionForm: FormGroup;
  uploadForm: FormGroup;
  submitted: boolean;
  selectedFile: File = null;
  description: string;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private httpClient: HttpClient,
              private sectionService: SectionService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      fileSection: ['']
    });

    this.sectionForm = this.fb.group({
      type_section: new FormControl('', Validators.required),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      file: new FormControl('', Validators.required)
    });
  }

  onSubmit(value: string) {
    console.log(value);

    console.log(this.selectedFile.name);
    console.log(this.selectedFile);
    this.submitted = true;
    const fd = new FormData();

    fd.append('name', this.sectionForm.get('name').value);
    fd.append('description', this.sectionForm.get('description').value);
    fd.append('fileSection', this.sectionForm.get('file').value);

    if (this.sectionForm.value.type_section === 'Advert') {
      this.sectionService.createSectionAdvertisement(fd).subscribe(
        (val: any) => {
          console.log(val);
        }
      );
    } else {
      this.sectionService.createSectionStory(fd).subscribe(
        (val: any) => {
          console.log(val);
        }
      );
    }
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Form Submitted'});
  }

  get diagnostic() {
    return JSON.stringify(this.sectionForm.value);
  }

  onFileSelected(event) {
    console.log('FormGroup: ' + this.sectionForm);
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log('file: ' + this.selectedFile.name);
    this.sectionForm.get('file').setValue(this.selectedFile);
  }
}
