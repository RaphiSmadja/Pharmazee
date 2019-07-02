import { Component, OnInit } from '@angular/core';
import {PrescriptionService} from '../../services/prescription.service';
import {Orders} from '../../entities/Orders';
import {Prescription} from '../../entities/Prescription';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  prescription: Prescription[] = [];
  prescription2: Prescription[];
  cols: any [];
  statusArr: SelectItem[];
  clonedPrescription: { [s: number]: Prescription; } = {};


  constructor(private prescriptionService: PrescriptionService, private messageService: MessageService) { }

  ngOnInit() {
    this.statusArr = [
      {label: 'Prescription Pending', value: 'Prescription pending'},
      {label: 'Prescription in preparation', value: 'Prescription in preparation'},
      {label: 'Prescription ready', value: 'Prescription ready'},
      {label: 'Cancelled Prescription', value: 'Cancelled Prescription'},
      {label: 'Doned Prescription', value: 'Done Prescription'},
      {label: 'Blocked Prescription', value: 'Blocked Prescription'}
    ];

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Title' },
      { field: 'status', header: 'Status' },
      { field: 'nbloyalty', header: 'Nombre de points gagnés' },
      { field: 'createdAt', header: 'Date de création'},
    ];

    this.listAllPrescription();
  }


  listAllPrescription() {
    this.prescriptionService.listByPharmacy().subscribe(res => {
      console.log(res);
      if (res.msg === 'OK') {
        this.prescription = res.result;
        console.log(this.prescription);
      } else {
        console.log('Error:' + res.result);
      }
    });
  }

  onRowEditInit(pres: Prescription) {
    this.clonedPrescription[pres.id] = {...pres};
  }

  onRowEditSave(pres: Prescription) {
    if (pres.title.length > 2) {
      delete this.clonedPrescription[pres.title];
      console.log('title: pres.title ' + pres.title);
      console.log('title: pres.status ' + pres.status);
      this.prescriptionService.modifyPrescription({title: pres.title, status: pres.status}, pres.id).subscribe(
        (val) => {
          if (val.msg === 'OK') {
            this.messageService.add({severity: 'info', summary: 'Modification réussie', detail: 'L\'ordonnance a bien été modifié'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Modification Échouée',
              detail: 'Erreur : L\'ordonnance n\'a pas été modifié'});
          }
        }, (err) => {
          console.error(err);
        }, () => console.log('onCompleted')
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'L\'ordonnance doit avoir un titre > 2 char'});
    }
  }

  onRowEditCancel(pres: Prescription, index: number) {
    console.log(this.prescription[index]);
    this.prescriptionService.deletePrescription(this.prescription[index].id).subscribe(
      (val) => {
        if (val.msg === 'OK') {
          this.messageService.add({severity: 'info', summary: 'Suppréssion réussie', detail: 'L\'ordonnance a bien été supprimé'});
        } else {
          this.messageService.add({severity: 'error',
            summary: 'Suppréssion Échouée', detail: 'Erreur : L\'ordonnance n\'a pas été supprimé'});
        }
      }, (err) => {
        console.error(err);
      }, () => console.log('onCompleted')
    );
    delete this.clonedPrescription[pres.id];
  }

}
