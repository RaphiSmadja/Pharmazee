import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProductComponent } from './creation-product.component';

describe('CreationProductComponent', () => {
  let component: CreationProductComponent;
  let fixture: ComponentFixture<CreationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
