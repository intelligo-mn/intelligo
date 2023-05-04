import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NucleoSectionComponent } from './nucleo-section.component';

describe('NucleoSectionComponent', () => {
  let component: NucleoSectionComponent;
  let fixture: ComponentFixture<NucleoSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NucleoSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NucleoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
