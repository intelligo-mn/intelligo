import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { SectionDetailComponent } from 'app/entities/section/section-detail.component';
import { Section } from 'app/shared/model/section.model';

describe('Component Tests', () => {
  describe('Section Management Detail Component', () => {
    let comp: SectionDetailComponent;
    let fixture: ComponentFixture<SectionDetailComponent>;
    const route = ({ data: of({ section: new Section(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [SectionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SectionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SectionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load section on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.section).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
