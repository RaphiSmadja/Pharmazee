import {Component, OnInit} from '@angular/core';
import {MessageService, SelectItem} from 'primeng/api';
import {Tag} from '../../entities/Tag';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/products.service';
import {TagService} from '../../services/tag.service';
import {ListoftagService} from '../../services/listoftag.service';

@Component({
  selector: 'app-creation-product',
  templateUrl: './creation-product.component.html',
  styleUrls: ['./creation-product.component.css']
})
export class CreationProductComponent implements OnInit {

  text1: string;
  property = '';
  text2: string;
  val: number;
  val1: number;
  description: string;
  finding = false;
  uploadedFiles: any[] = [];
  tag: SelectItem[] = [];
  creationProductForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    price: ['', Validators.compose([Validators.required, Validators.min(0), Validators.pattern('^\\d+(,\\d{3})*(\\.\\d{1,2})?$')])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    stock: ['', Validators.compose([Validators.required, Validators.min(0)])],
    picture1: [''],
    picture2: [''],
    picture3: [''],
    listOfTag: this.fb.group({
      tag1: [''],
      tag2: [''],
      tag3: ['']
    })
  });
  images: any[] = [];
  private i: number;
  selectedValues: string[] = [];
  sendTag = false;

  constructor(private fb: FormBuilder, private productService: ProductService,
              private tagService: TagService, private listoftagService: ListoftagService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    console.log(this.creationProductForm.get(name));

    // tslint:disable-next-line:jsdoc-format
    /** TODO get all tag **/

    this.listAllTag();
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.creationProductForm.value);
    console.warn(this.selectedValues);
    this.creationProductForm.get('picture1').setValue(this.selectedValues[0]);
    this.creationProductForm.get('picture2').setValue(this.selectedValues[1]);
    this.creationProductForm.get('picture3').setValue(this.selectedValues[2]);
    console.warn(this.creationProductForm.value);
    this.productService.create(this.creationProductForm).subscribe(
      (x: any) => {
        console.log(x);
        if (x.msg === 'OK') {
          this.sendTag = true;
          if (this.sendTag === true) {
            console.log('this.creationProductForm.get(\'listOfTag\').value ' + this.creationProductForm.get('listOfTag').value);
            console.log('this.creationProductForm.get(\'listOfTag\') ' + this.creationProductForm.get('listOfTag'));
            console.log('this.creationProductForm.get(\'listOfTag\') ' + this.creationProductForm.get('listOfTag').get('tag1').value);
            this.tagService.create({tag: this.creationProductForm.get('listOfTag').get('tag1').value}).subscribe(
              (y: any) => {
                console.log(y);
                if (y.msg === 'OK') {
                  this.listoftagService.create({id_product: x.result.id, id_tag: y.result.id}).subscribe(
                    (z: any) => {
                      console.log(z);
                    }
                  );
                }
              }
            );
            this.tagService.create({tag: this.creationProductForm.get('listOfTag').get('tag2').value}).subscribe(
              (y: any) => {
                if (y.msg === 'OK') {
                  this.listoftagService.create({id_product: x.result.id, id_tag: y.result.id}).subscribe(
                    (z: any) => {
                      console.log(z);
                    }
                  );
                }
              }
            );
            this.tagService.create({tag: this.creationProductForm.get('listOfTag').get('tag3').value}).subscribe(
              (y: any) => {
                if (y.msg === 'OK') {
                  this.listoftagService.create({id_product: x.result.id, id_tag: y.result.id}).subscribe(
                    (z: any) => {
                      console.log(z);
                      if (z.msg === 'OK') {
                        this.listAllTag();
                        this.messageService.add({severity: 'success', summary: 'Création', detail: 'Votre produit a bien été créé'});
                      }
                    }
                  );
                }
              }
            );
          }
        }
      }
    );

  }

  async crawlP() {
    this.finding = true;
    this.selectedValues = [];
    console.log(this.creationProductForm.get('name'));
    await this.productService.crawl({medoc: this.creationProductForm.get('name').value}).subscribe(
      (x: any) => {
        this.images = [];
        console.log(x);
        for (this.i = 0; this.i < x.msg.length; this.i++) {
          this.images.push({source: x.msg[this.i].url, thumbnail: x.msg[this.i].url});
        }
      }
    );
  }

  listAllTag() {
    this.tag = [];
    this.tagService.listAll().subscribe(
      (val) => {
        console.log(val);
        if (val.msg === 'OK') {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < val.result.length; i++) {
            this.tag.push({label: val.result[i].name, value: {id: val.result[i].id, name: val.result[i].name}});
          }
        }
      }
    );
  }
}
