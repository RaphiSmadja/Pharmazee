import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSectionComponent } from './creation-section.component';

describe('CreationSectionComponent', () => {
  let component: CreationSectionComponent;
  let fixture: ComponentFixture<CreationSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
