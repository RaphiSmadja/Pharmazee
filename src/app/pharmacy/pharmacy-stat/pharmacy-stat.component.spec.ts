import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyStatComponent } from './pharmacy-stat.component';

describe('PharmacyStatComponent', () => {
  let component: PharmacyStatComponent;
  let fixture: ComponentFixture<PharmacyStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
