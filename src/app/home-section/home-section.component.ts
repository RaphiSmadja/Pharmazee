import {Component, OnDestroy, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {Subscription} from 'rxjs';
import {HomeSectionService} from './home-section.service';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit, OnDestroy {
  homeSections: any[];
  private sectionsSubscription: Subscription;
  constructor(private homeSectionService: HomeSectionService) { }

  ngOnInit() {
    AOS.init();
    this.sectionsSubscription = this.homeSectionService.sectionSubject.subscribe(
      (sections: any[]) => {
        this.homeSections = sections;
      }
    );
    this.homeSectionService.emitAppareilSubject();
  }

  ngOnDestroy() {
    this.sectionsSubscription.unsubscribe();
  }
}
