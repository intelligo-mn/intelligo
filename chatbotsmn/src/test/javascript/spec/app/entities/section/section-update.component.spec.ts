import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ChatbotsmnTestModule } from '../../../test.module';
import { SectionUpdateComponent } from 'app/entities/section/section-update.component';
import { SectionService } from 'app/entities/section/section.service';
import { Section } from 'app/shared/model/section.model';

describe('Component Tests', () => {
  describe('Section Management Update Component', () => {
    let comp: SectionUpdateComponent;
    let fixture: ComponentFixture<SectionUpdateComponent>;
    let service: SectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChatbotsmnTestModule],
        declarations: [SectionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SectionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SectionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SectionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Section(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Section();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
