import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsSectionComponent } from './alerts-section.component';

describe('AlertsSectionComponent', () => {
  let component: AlertsSectionComponent;
  let fixture: ComponentFixture<AlertsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
