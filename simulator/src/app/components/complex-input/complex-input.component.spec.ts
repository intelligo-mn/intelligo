import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexInputComponent } from './complex-input.component';

describe('ComplexInputComponent', () => {
  let component: ComplexInputComponent;
  let fixture: ComponentFixture<ComplexInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
