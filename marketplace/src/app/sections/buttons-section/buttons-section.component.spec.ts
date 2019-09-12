import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsSectionComponent } from './buttons-section.component';

describe('ButtonsSectionComponent', () => {
  let component: ButtonsSectionComponent;
  let fixture: ComponentFixture<ButtonsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
