import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePharmacyComponent } from './favorite-pharmacy.component';

describe('FavoritePharmacyComponent', () => {
  let component: FavoritePharmacyComponent;
  let fixture: ComponentFixture<FavoritePharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
