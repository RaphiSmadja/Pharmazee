import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeSectionService {

  sectionSubject = new Subject<any[]>();

  private sections = [
    {
      id: 'img_1',
      h2: 'FirstH2',
      p: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras\n' +
      '    mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n' +
      '    condimentum nibh.',
      href: '#'
    },
    {
      id: 'img_2',
      h2: 'SecondH2',
      p: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras\n' +
      '    mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n' +
      '    condimentum nibh.',
      href: '#'
    },
    {
      id: 'img_3',
      h2: 'ThirdH2',
      p: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras\n' +
      '    mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n' +
      '    condimentum nibh.',
      href: '#'
    }
  ];

  emitAppareilSubject() {
    this.sectionSubject.next(this.sections.slice());
  }
}
