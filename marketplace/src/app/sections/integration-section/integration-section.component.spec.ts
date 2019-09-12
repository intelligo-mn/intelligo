import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationSectionComponent } from './integration-section.component';

describe('IntegrationSectionComponent', () => {
  let component: IntegrationSectionComponent;
  let fixture: ComponentFixture<IntegrationSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
